import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

export interface Project {
  id?: string;
  slug: string;
  title: string;
  images: string[];
  description?: string | null;
  coverImageUrl?: string | null;
  location?: string | null;
  year?: number | null;
  status?: string | null;
  sortOrder?: number | null;
}

interface ProjectImageRow {
  id: string;
  image_url: string;
  storage_path: string | null;
  sort_order: number | null;
  created_at?: string;
}

interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  year: number | null;
  status: string | null;
  cover_image_url: string | null;
  sort_order: number | null;
  created_at?: string;
  project_images?: ProjectImageRow[] | null;
}

function mapSupabaseProjects(rows: ProjectRow[]): Project[] {
  return rows.map((row) => {
    const sortedImages = [...(row.project_images ?? [])].sort((a, b) => {
      const sortDiff = (a.sort_order ?? Number.MAX_SAFE_INTEGER) - (b.sort_order ?? Number.MAX_SAFE_INTEGER);
      if (sortDiff !== 0) {
        return sortDiff;
      }
      return (a.created_at ?? "").localeCompare(b.created_at ?? "");
    });

    const imageUrls = sortedImages.map((img) => img.image_url).filter(Boolean);
    const uniqueImageUrls = row.cover_image_url
      ? [row.cover_image_url, ...imageUrls.filter((url) => url !== row.cover_image_url)]
      : imageUrls;

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      location: row.location,
      year: row.year,
      status: row.status,
      coverImageUrl: row.cover_image_url,
      sortOrder: row.sort_order,
      images: uniqueImageUrls,
    };
  });
}

function getAllProjectsFromPublic(): Project[] {
  const projectsDir = path.join(process.cwd(), "public/projeler");

  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const folders = fs.readdirSync(projectsDir).filter((file) => {
    const fullPath = path.join(projectsDir, file);
    return fs.statSync(fullPath).isDirectory();
  });

  return folders.map((folder) => {
    const trimmedFolder = folder.trim();
    const folderPath = path.join(projectsDir, folder);
    const images = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `/projeler/${folder}/${file}`);

    const title = trimmedFolder;

    return {
      slug: slugify(trimmedFolder),
      title,
      images,
    };
  });
}

export async function getAllProjects(): Promise<Project[]> {
  noStore();
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return getAllProjectsFromPublic();
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title, description, location, year, status, cover_image_url, sort_order, created_at, project_images (id, image_url, storage_path, sort_order, created_at)"
    )
    .order("sort_order", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return getAllProjectsFromPublic();
  }

  return mapSupabaseProjects(data as ProjectRow[]);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug);
}
