import fs from "fs/promises";
import path from "path";
import ProjectsClient from "./ProjectsClient";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  topics: string[];
  homepage: string | null;
  html_url: string;
  created_at: string;
};

function transformRepos(repos: Repo[]) {
  return repos.map((repo) => ({
    id: repo.id.toString(),
    name: repo.name,
    description: repo.description || "Sin descripción",
    coverImage: `/projects/${repo.name}.webp`,
    technologies: repo.topics || [],
    links: {
      website: repo.homepage || "",
      github: repo.html_url,
    },
    date: repo.created_at,
  }));
}

export const revalidate = 60 * 60 * 24 * 7; // ISR (revalida cada 7 días)

export default async function ProjectsPage() {
  const token = process.env.MY_GITHUB_TOKEN;
  if (!token) throw new Error("Falta MY_GITHUB_TOKEN en variables de entorno.");

  // Consumo de la API de GitHub para proyectos públicos
  const res = await fetch("https://api.github.com/user/repos?visibility=public", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Next.js",
    },
    next: { revalidate },
  });

  if (!res.ok) throw new Error("Error al obtener repositorios");
  const repos: Repo[] = await res.json();
  const publicProjects = transformRepos(repos);

  // Lectura de los proyectos privados desde JSON
  const filePath = path.join(process.cwd(), "app", "data", "projects.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const privateProjects = JSON.parse(fileContent); // se asume que es un array de objetos

  // Se pueden empezar los IDs privados en 1000 para no tener conflicto
  // (Si se requiere, se puede iterar y ajustar el id en cada objeto)

  const allProjects = [...publicProjects, ...privateProjects];

  return <ProjectsClient initialProjects={allProjects} />;
}
