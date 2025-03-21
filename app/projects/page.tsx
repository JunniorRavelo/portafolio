"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Calendar,
  Tag,
  ArrowUpNarrowWideIcon as SortAlphaAsc,
  ArrowDownWideNarrowIcon as SortAlphaDesc,
  ExternalLink,
  Github,
  Youtube,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"

// Definimos el tipo Project
type Project = {
  id: string
  name: string
  description: string
  coverImage: string
  technologies: string[]
  links: {
    website?: string
    github?: string
    youtube?: string
  }
  date: string // Formato "YYYY-MM-DD"
}

// 25 PROYECTOS DE EJEMPLO
const projectsData: Project[] = [
  {
    id: "1",
    name: "Proyecto 1",
    description: "Descripción breve del proyecto 1.",
    coverImage: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    links: { website: "https://example.com", github: "https://github.com/example/1" },
    date: "2025-01-01",
  },
  {
    id: "2",
    name: "Proyecto 2",
    description: "Descripción breve del proyecto 2.",
    coverImage: "/placeholder.svg",
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    links: { github: "https://github.com/example/2" },
    date: "2025-01-02",
  },
  {
    id: "3",
    name: "Proyecto 3",
    description: "Descripción breve del proyecto 3.",
    coverImage: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Redux"],
    links: { youtube: "https://youtube.com/watch?v=example3" },
    date: "2025-01-03",
  },
  {
    id: "4",
    name: "Proyecto 4",
    description: "Descripción breve del proyecto 4.",
    coverImage: "/placeholder.svg",
    technologies: ["Node.js", "Express", "MongoDB"],
    links: { website: "https://example4.com", github: "https://github.com/example/4" },
    date: "2025-01-04",
  },
  {
    id: "5",
    name: "Proyecto 5",
    description: "Descripción breve del proyecto 5.",
    coverImage: "/placeholder.svg",
    technologies: ["Vue.js", "Pinia", "Tailwind CSS"],
    links: { website: "https://example5.com" },
    date: "2025-01-05",
  },
  {
    id: "6",
    name: "Proyecto 6",
    description: "Descripción breve del proyecto 6.",
    coverImage: "/placeholder.svg",
    technologies: ["Angular", "RxJS", "NgRx"],
    links: { github: "https://github.com/example/6" },
    date: "2025-01-06",
  },
  {
    id: "7",
    name: "Proyecto 7",
    description: "Descripción breve del proyecto 7.",
    coverImage: "/placeholder.svg",
    technologies: ["Python", "Django", "PostgreSQL"],
    links: { website: "https://example7.com", github: "https://github.com/example/7" },
    date: "2025-01-07",
  },
  {
    id: "8",
    name: "Proyecto 8",
    description: "Descripción breve del proyecto 8.",
    coverImage: "/placeholder.svg",
    technologies: ["Go", "Fiber", "MySQL"],
    links: { website: "https://example8.com" },
    date: "2025-01-08",
  },
  {
    id: "9",
    name: "Proyecto 9",
    description: "Descripción breve del proyecto 9.",
    coverImage: "/placeholder.svg",
    technologies: ["PHP", "Laravel", "MySQL"],
    links: { github: "https://github.com/example/9" },
    date: "2025-01-09",
  },
  {
    id: "10",
    name: "Proyecto 10",
    description: "Descripción breve del proyecto 10.",
    coverImage: "/placeholder.svg",
    technologies: ["Ruby", "Rails", "PostgreSQL"],
    links: { github: "https://github.com/example/10", youtube: "https://youtube.com/watch?v=example10" },
    date: "2025-01-10",
  },
  {
    id: "11",
    name: "Proyecto 11",
    description: "Descripción breve del proyecto 11.",
    coverImage: "/placeholder.svg",
    technologies: ["React", "Node.js", "GraphQL"],
    links: { website: "https://example11.com" },
    date: "2025-01-11",
  },
  {
    id: "12",
    name: "Proyecto 12",
    description: "Descripción breve del proyecto 12.",
    coverImage: "/placeholder.svg",
    technologies: ["React Native", "Expo", "SQLite"],
    links: { github: "https://github.com/example/12" },
    date: "2025-01-12",
  },
  {
    id: "13",
    name: "Proyecto 13",
    description: "Descripción breve del proyecto 13.",
    coverImage: "/placeholder.svg",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
    links: { youtube: "https://youtube.com/watch?v=example13" },
    date: "2025-01-13",
  },
  {
    id: "14",
    name: "Proyecto 14",
    description: "Descripción breve del proyecto 14.",
    coverImage: "/placeholder.svg",
    technologies: ["Angular", "NestJS", "MySQL"],
    links: { website: "https://example14.com", github: "https://github.com/example/14" },
    date: "2025-01-14",
  },
  {
    id: "15",
    name: "Proyecto 15",
    description: "Descripción breve del proyecto 15.",
    coverImage: "/placeholder.svg",
    technologies: ["Svelte", "Node.js", "PostgreSQL"],
    links: { website: "https://example15.com" },
    date: "2025-01-15",
  },
  {
    id: "16",
    name: "Proyecto 16",
    description: "Descripción breve del proyecto 16.",
    coverImage: "/placeholder.svg",
    technologies: ["Go", "Gin", "MongoDB"],
    links: { github: "https://github.com/example/16" },
    date: "2025-01-16",
  },
  {
    id: "17",
    name: "Proyecto 17",
    description: "Descripción breve del proyecto 17.",
    coverImage: "/placeholder.svg",
    technologies: ["Python", "Flask", "SQLite"],
    links: { website: "https://example17.com", youtube: "https://youtube.com/watch?v=example17" },
    date: "2025-01-17",
  },
  {
    id: "18",
    name: "Proyecto 18",
    description: "Descripción breve del proyecto 18.",
    coverImage: "/placeholder.svg",
    technologies: ["Vue.js", "Node.js", "GraphQL"],
    links: { github: "https://github.com/example/18" },
    date: "2025-01-18",
  },
  {
    id: "19",
    name: "Proyecto 19",
    description: "Descripción breve del proyecto 19.",
    coverImage: "/placeholder.svg",
    technologies: ["React", "AWS Lambda", "DynamoDB"],
    links: { website: "https://example19.com" },
    date: "2025-01-19",
  },
  {
    id: "20",
    name: "Proyecto 20",
    description: "Descripción breve del proyecto 20.",
    coverImage: "/placeholder.svg",
    technologies: ["Next.js", "tRPC", "Prisma"],
    links: { github: "https://github.com/example/20" },
    date: "2025-01-20",
  },
  {
    id: "21",
    name: "Proyecto 21",
    description: "Descripción breve del proyecto 21.",
    coverImage: "/placeholder.svg",
    technologies: ["React Native", "Firebase", "Tailwind CSS"],
    links: { youtube: "https://youtube.com/watch?v=example21" },
    date: "2025-01-21",
  },
  {
    id: "22",
    name: "Proyecto 22",
    description: "Descripción breve del proyecto 22.",
    coverImage: "/placeholder.svg",
    technologies: ["Angular", "Node.js", "Redis"],
    links: { website: "https://example22.com" },
    date: "2025-01-22",
  },
  {
    id: "23",
    name: "Proyecto 23",
    description: "Descripción breve del proyecto 23.",
    coverImage: "/placeholder.svg",
    technologies: ["PHP", "Laravel", "MySQL"],
    links: { github: "https://github.com/example/23" },
    date: "2025-01-23",
  },
  {
    id: "24",
    name: "Proyecto 24",
    description: "Descripción breve del proyecto 24.",
    coverImage: "/placeholder.svg",
    technologies: ["Ruby", "Rails", "PostgreSQL"],
    links: { website: "https://example24.com", github: "https://github.com/example/24" },
    date: "2025-01-24",
  },
  {
    id: "25",
    name: "Proyecto 25",
    description: "Descripción breve del proyecto 25.",
    coverImage: "/placeholder.svg",
    technologies: ["Go", "Echo", "MySQL"],
    links: { youtube: "https://youtube.com/watch?v=example25" },
    date: "2025-01-25",
  },
]

// Extraemos tecnologías únicas
function getAllTechnologies(projects: Project[]): string[] {
  const techSet = new Set<string>()
  projects.forEach((p) => p.technologies.forEach((tech) => techSet.add(tech)))
  return Array.from(techSet).sort()
}

// Formatear fecha manual para evitar TimeZone
function formatDate(dateString: string): string {
  // dateString "YYYY-MM-DD"
  const [year, month, day] = dateString.split("-").map(Number)
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ]
  return `${day} de ${months[month - 1]} de ${year}`
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedTech, setSelectedTech] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")

  // Para paginación
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const allTechnologies = getAllTechnologies(projectsData)

  // Filtrar y ordenar proyectos
  const filteredProjects = (() => {
    let result = [...projectsData]

    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.technologies.some((t) => t.toLowerCase().includes(term)),
      )
    }

    // Filtro por tecnología
    if (selectedTech) {
      result = result.filter((p) => p.technologies.includes(selectedTech))
    }

    // Filtro por año
    if (dateFilter) {
      result = result.filter((p) => p.date.split("-")[0] === dateFilter)
    }

    // Orden A-Z / Z-A
    result.sort((a, b) => {
      if (sortDirection === "asc") return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    })

    return result
  })()

  // Cálculo de paginación
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  // Asegura que currentPage no exceda totalPages (por si aplican filtros)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [currentPage, totalPages])

  // Slice para mostrar proyectos en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProjects = filteredProjects.slice(startIndex, endIndex)

  // Alternar orden
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  // Funciones de paginación
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mis Proyectos
        </motion.h1>

        {/* Filtros */}
        <motion.div
          className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar proyecto..."
                className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro tecnología */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
              >
                <option value="">Todas las tecnologías</option>
                {allTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro año */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              {/* Obtenemos años únicos */}
              <select
                className="pl-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Todos los años</option>
                {Array.from(new Set(projectsData.map((p) => p.date.split("-")[0])))
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>

            {/* Ordenar A-Z / Z-A */}
            <button
              onClick={toggleSortDirection}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Orden:{" "}
              {sortDirection === "asc" ? (
                <>
                  <SortAlphaAsc className="h-5 w-5" /> A-Z
                </>
              ) : (
                <>
                  <SortAlphaDesc className="h-5 w-5" /> Z-A
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Grid de Proyectos (solo los que tocan en esta página) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.coverImage || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Fecha sin new Date */}
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(project.date)}
                  </div>

                  {/* Enlaces */}
                  <div className="flex gap-3">
                    {project.links.website && (
                      <Link
                        href={project.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Visitar sitio web"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </Link>
                    )}
                    {project.links.github && (
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Ver código fuente en GitHub"
                      >
                        <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </Link>
                    )}
                    {project.links.youtube && (
                      <Link
                        href={project.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Ver demo en YouTube"
                      >
                        <Youtube className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No se encontraron proyectos que coincidan con tus criterios.
              </p>
            </div>
          )}
        </div>

        {/* Controles de Paginación */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Anterior
          </button>

          <span className="text-gray-700 dark:text-gray-200">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Siguiente
          </button>
        </div>

        {/* Botón para volver al inicio */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

