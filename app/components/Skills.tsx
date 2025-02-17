"use client"

import { motion } from "framer-motion"
import { Code, Server, Database, Layout, GitBranch, Layers, Cpu, Globe, Workflow, } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
)

export const skills = [
  {
    icon: Code,
    name: "Desarrollo Frontend",
    tech: "React, Next.js, Vue.js",
    description:
      "Creación de interfaces de usuario responsivas e interactivas con React, Next.js y Vue.js, aprovechando las últimas funcionalidades para ofrecer una excelente experiencia de usuario.",
    color: "text-blue-500",
  },
  {
    icon: Server,
    name: "Desarrollo Backend",
    tech: "Node.js, Express, Golang, Flask",
    description:
      "Implementando aplicaciones del lado del servidor con Node.js, Express, Golang y Flask, enfocadas en escalabilidad, seguridad y arquitectura limpia.",
    color: "text-green-500",
  },
  {
    icon: Database,
    name: "Gestión de Bases de Datos",
    tech: "MongoDB, PostgreSQL, MySQL, SQL Server",
    description:
      "Diseñando e implementando esquemas de bases de datos eficientes con MongoDB, PostgreSQL, MySQL y SQL Server para un manejo de datos seguro y escalable.",
    color: "text-purple-500",
  },
  {
    icon: Layout,
    name: "Diseño UI/UX",
    tech: "Tailwind CSS, Material UI",
    description:
      "Creando interfaces de usuario atractivas y fáciles de usar, aplicando principios de diseño e implementaciones modernas con Tailwind CSS y Material UI.",
    color: "text-pink-500",
  },
  {
    icon: GitBranch,
    name: "DevOps e Infraestructura",
    tech: "Git, Docker, LXC, Ubuntu Server, Windows Server",
    description:
      "Configurando y administrando entornos de servidor en Ubuntu y Windows, orquestando contenedores con Docker y LXC, gestionando ciclos de vida de desarrollo con Git y desplegando plataformas como Odoo, WordPress y Zimbra.",
    color: "text-orange-500",
  },
  {
    icon: Layers,
    name: "Gestión de Estado",
    tech: "Redux, Context API",
    description:
      "Controlando el flujo de datos en aplicaciones complejas utilizando soluciones de gestión de estado como Redux y Context API.",
    color: "text-indigo-500",
  },
  {
    icon: Cpu,
    name: "Desarrollo de APIs",
    tech: "REST",
    description:
      "Diseñando e implementando APIs seguras y eficientes que permiten la comunicación fluida entre servicios y clientes.",
    color: "text-red-500",
  },
  {
    icon: Globe,
    name: "Rendimiento Web",
    tech: "Optimización, SEO",
    description:
      "Optimizando sitios y aplicaciones para mejorar la velocidad, accesibilidad y posicionamiento en motores de búsqueda.",
    color: "text-teal-500",
  },
  {
    icon: Workflow,
    name: "Automatizaciones (RPA/BPA)",
    tech: "Scraping, UiPath, Power Automate, Automation Anywhere",
    description:
      "Creación de flujos automatizados para la extracción de datos, integración de procesos y optimización de tareas repetitivas.",
    color: "text-cyan-500",
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Fondo Degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"></div>

      {/* Ilustraciones de Habilidades */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skill-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#skill-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Habilidades y Experiencia" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <SkillIcon icon={skill.icon} color={skill.color} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.tech}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
