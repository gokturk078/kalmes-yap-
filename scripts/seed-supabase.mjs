import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_PROJECTS_BUCKET || "project-images";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

function slugify(text) {
  const trMap = {
    ç: "c",
    ğ: "g",
    ş: "s",
    ü: "u",
    ı: "i",
    ö: "o",
    Ç: "C",
    Ğ: "G",
    Ş: "S",
    Ü: "U",
    İ: "I",
    Ö: "O",
  };

  return text
    .split("")
    .map((char) => trMap[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

function sanitizeFilename(fileName) {
  const extension = fileName.includes(".") ? fileName.split(".").pop() : "jpg";
  const rawName = fileName.replace(/\.[^.]+$/, "");
  const normalized = slugify(rawName) || `image-${Date.now()}`;
  return `${normalized}.${extension}`;
}

function getMimeType(fileName) {
  const extension = fileName.toLowerCase().split(".").pop();
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "gif") return "image/gif";
  return "image/jpeg";
}

async function ensureBucket(bucketName) {
  const { data, error } = await supabase.storage.getBucket(bucketName);

  if (!error && data) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: "50MB",
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  });

  if (createError) {
    throw new Error(`Bucket create failed: ${createError.message}`);
  }
}

async function upsertProject(folderName, sortOrder) {
  const title = folderName.trim();
  const slug = slugify(title);

  const { data, error } = await supabase
    .from("projects")
    .upsert(
      {
        slug,
        title,
        sort_order: sortOrder,
        status: "Tamamlandı",
      },
      { onConflict: "slug" }
    )
    .select("id, slug, title, cover_image_url")
    .single();

  if (error || !data) {
    throw new Error(`Project upsert failed for ${folderName}: ${error?.message || "unknown error"}`);
  }

  return data;
}

async function processFolder(baseDir, folderName, sortOrder) {
  const project = await upsertProject(folderName, sortOrder);
  const folderPath = path.join(baseDir, folderName);

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "tr"));

  if (files.length === 0) {
    return;
  }

  const { error: deleteRowsError } = await supabase
    .from("project_images")
    .delete()
    .eq("project_id", project.id);

  if (deleteRowsError) {
    throw new Error(`Existing image rows cleanup failed for ${folderName}: ${deleteRowsError.message}`);
  }

  const imageRows = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const absolutePath = path.join(folderPath, file);
    const storagePath = `${project.slug}/${sanitizeFilename(file)}`;
    const fileBuffer = fs.readFileSync(absolutePath);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, { upsert: true, contentType: getMimeType(file) });

    if (uploadError) {
      throw new Error(`Upload failed for ${folderName}/${file}: ${uploadError.message}`);
    }

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

    imageRows.push({
      project_id: project.id,
      image_url: publicData.publicUrl,
      storage_path: storagePath,
      sort_order: index,
    });
  }

  const { error: rowsError } = await supabase.from("project_images").insert(imageRows);

  if (rowsError) {
    throw new Error(`Image rows insert failed for ${folderName}: ${rowsError.message}`);
  }

  if (imageRows[0]?.image_url) {
    const { error: coverError } = await supabase
      .from("projects")
      .update({ cover_image_url: imageRows[0].image_url })
      .eq("id", project.id);

    if (coverError) {
      throw new Error(`Cover update failed for ${folderName}: ${coverError.message}`);
    }
  }

  console.log(`Seeded: ${project.title} (${files.length} images)`);
}

async function main() {
  await ensureBucket(BUCKET);

  const projectsDir = path.join(process.cwd(), "public", "projeler");

  if (!fs.existsSync(projectsDir)) {
    throw new Error("public/projeler folder not found.");
  }

  const folders = fs
    .readdirSync(projectsDir)
    .filter((entry) => fs.statSync(path.join(projectsDir, entry)).isDirectory())
    .sort((a, b) => a.localeCompare(b, "tr"));

  for (let index = 0; index < folders.length; index += 1) {
    await processFolder(projectsDir, folders[index], index);
  }

  console.log("Supabase seed completed successfully.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
