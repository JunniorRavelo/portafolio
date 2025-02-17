"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Layout, GitBranch, Terminal, Layers, Cpu, Globe, Workflow } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
)

const skills = [
  {
    icon: Code,
    name: "Desarrollo Frontend",
    tech: "React.js, Next.js",
    description:
      "Construyendo interfaces de usuario responsivas e interactivas con las funcionalidades modernas de React y Next.js para un rendimiento óptimo.",
    color: "text-blue-500",
  },
  {
    icon: Server,
    name: "Desarrollo Backend",
    tech: "Node.js, Express, Fastify",
    description: "Creando aplicaciones del lado del servidor robustas, con enfoque en escalabilidad y arquitectura limpia.",
    color: "text-green-500",
  },
  {
    icon: Database,
    name: "Gestión de Bases de Datos",
    tech: "MongoDB, Mongoose",
    description:
      "Diseñando e implementando esquemas de base de datos y consultas eficientes para una óptima gestión de datos.",
    color: "text-purple-500",
  },
  {
    icon: Layout,
    name: "Diseño UI/UX",
    tech: "Tailwind CSS, Material UI",
    description:
      "Creando interfaces de usuario hermosas e intuitivas con principios de diseño y frameworks modernos.",
    color: "text-pink-500",
  },
  {
    icon: GitBranch,
    name: "Control de Versiones",
    tech: "Git, GitHub",
    description:
      "Gestionando versiones de código de manera eficiente con Git y colaborando efectivamente a través de GitHub.",
    color: "text-orange-500",
  },
  {
    icon: Terminal,
    name: "TypeScript",
    tech: "TypeScript, JavaScript",
    description:
      "Escribiendo código con tipado estricto para mejorar la mantenibilidad y la experiencia del desarrollador.",
    color: "text-yellow-500",
  },
  {
    icon: Layers,
    name: "Gestión de Estado",
    tech: "Redux, Context API",
    description:
      "Gestionando el estado de aplicaciones complejas con soluciones modernas de gestión de estado.",
    color: "text-indigo-500",
  },
  {
    icon: Cpu,
    name: "Desarrollo de APIs",
    tech: "REST, GraphQL",
    description:
      "Diseñando e implementando APIs eficientes para una comunicación de datos fluida.",
    color: "text-red-500",
  },
  {
    icon: Globe,
    name: "Rendimiento Web",
    tech: "Optimización, SEO",
    description:
      "Optimizando aplicaciones web para velocidad, accesibilidad y visibilidad en buscadores.",
    color: "text-teal-500",
  },
  {
    icon: Workflow,
    name: "Metodologías Ágiles",
    tech: "Scrum, Kanban",
    description:
      "Trabajando eficientemente en entornos ágiles con enfoque en la entrega continua.",
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
