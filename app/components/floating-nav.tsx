"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Acerca" },
  { id: "experience", label: "Experiencia" },
  { id: "skills", label: "Habilidades" },
  { id: "services", label: "Servicios" },
  { id: "education", label: "Educación" },
  { id: "contact", label: "Contacto" },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobile, setIsMobile] = useState(false)
  const [tappedId, setTappedId] = useState<string | null>(null)

  useEffect(() => {
    // Detecta si es móvil
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // IntersectionObserver para actualizar activeSection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener("resize", checkMobile)
      observer.disconnect()
    }
  }, [])

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    if (isMobile) {
      setTappedId(id)
      setTimeout(() => setTappedId(null), 2000)
    }
  }

  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 md:right-4 sm:right-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex flex-col gap-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="group relative flex items-center"
            aria-label={`Desplazar a ${label}`}
          >
            <span
              onClick={(e) => {
                if (isMobile) e.stopPropagation()
              }}
              className={`absolute right-8 px-2 py-1 rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm transition-opacity duration-300 ${
                isMobile
                  ? tappedId === id
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "bg-blue-600 dark:bg-blue-400 scale-125"
                  : "bg-gray-400 dark:bg-gray-600 hover:scale-110"
              }`}
            />
          </button>
        ))}
      </div>
    </motion.div>
  )
}
