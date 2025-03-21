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
  date: string
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("T")[0].split("-").map(Number)
  const months = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre"
  ]
  return `${day} de ${months[month - 1]} de ${year}`
}

export default function ProjectsPage() {
  const [projectsData, setProjectsData] = useState<Project[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedTech, setSelectedTech] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<string>("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchReposFromApi = async () => {
      try {
        const res = await fetch("/api/projects", { method: "GET" })
        if (!res.ok) {
          console.error("Error al obtener repositorios:", res.statusText)
          return
        }

        const repos = await res.json()

        const transformed = repos.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "Sin descripción",
          coverImage: `/projects/${repo.name}.svg`, // Ajusta si no tienes esos SVG
          technologies: repo.topics || [],
          links: {
            website: repo.homepage,
            github: repo.html_url,
          },
          date: repo.created_at,
        })) as Project[]

        setProjectsData(transformed)
      } catch (error) {
        console.error("Error general:", error)
      }
    }

    fetchReposFromApi()
  }, [])

  const allTechnologies = Array.from(
    new Set(projectsData.flatMap((p) => p.technologies))
  ).sort()

  const filteredProjects = (() => {
    let result = [...projectsData]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.technologies.some((t) => t.toLowerCase().includes(term))
      )
    }

    if (selectedTech) {
      result = result.filter((p) => p.technologies.includes(selectedTech))
    }

    if (dateFilter) {
      result = result.filter((p) => p.date.split("-")[0] === dateFilter)
    }

    result.sort((a, b) => {
      if (sortDirection === "asc") return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    })

    return result
  })()

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProjects = filteredProjects.slice(startIndex, endIndex)

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
  }
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

            {/* Filtro por año */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
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

        {/* Grid de Proyectos */}
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

                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(project.date)}
                  </div>

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

        {/* Paginación */}
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
