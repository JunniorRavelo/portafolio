// app/projects/page.tsx (Server Component)
import ProjectsClient from ".//ProjectsClient";

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

export default async function ProjectsPage() {
  const token = process.env.MY_GITHUB_TOKEN;
  if (!token) throw new Error("Falta el token de GitHub en variables de entorno.");

  const res = await fetch("https://api.github.com/user/repos?visibility=public", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Next.js",
    },
    // Revalida cada 7 días
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  if (!res.ok) throw new Error("Error al obtener repositorios");

  const repos: Repo[] = await res.json();
  const projectsData = transformRepos(repos);

  return <ProjectsClient initialProjects={projectsData} />;
}
