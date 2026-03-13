import fs from "fs";
import path from "path";

export interface Project {
  slug: string;
  title: string;
  images: string[];
  description?: string;
}

// Slugification utility to handle Turkish characters and spaces
function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'ğ': 'g', 'ş': 's', 'ü': 'u', 'ı': 'i', 'ö': 'o',
    'Ç': 'C', 'Ğ': 'G', 'Ş': 'S', 'Ü': 'U', 'İ': 'I', 'Ö': 'O'
  };
  
  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function getAllProjects(): Project[] {
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
    const images = fs.readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `/projeler/${folder}/${file}`);

    // Map the actual folder name to a readable title
    const title = trimmedFolder;

    return {
      slug: slugify(trimmedFolder),
      originalFolderName: folder, // Internal use
      title,
      images,
    };
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  // Since we use slugify for the folder scan too in getAllProjects, 
  // we just compare the generated slugs.
  return projects.find((p) => p.slug === slug);
}
