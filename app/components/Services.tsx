"use client"

import { motion } from "framer-motion"
import {
  Layout,
  Server,
  Code,
  Smartphone,
  Shield,
  Terminal,
  Database,
  Workflow
} from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Layout className="w-12 h-12 text-blue-500" />,
      title: "Desarrollo de Aplicaciones Web",
      description:
        "Creación de aplicaciones web personalizadas con React, Next.js o Vue.js, enfocadas en un alto rendimiento, escalabilidad y una excelente experiencia de usuario.",
    },
    {
      icon: <Server className="w-12 h-12 text-green-500" />,
      title: "Desarrollo Backend",
      description:
        "Soluciones de servidor robustas y escalables utilizando Node.js, Golang o Flask (Python), con énfasis en arquitectura limpia y seguridad.",
    },
    {
      icon: <Code className="w-12 h-12 text-purple-500" />,
      title: "Desarrollo de APIs",
      description:
        "Diseño e implementación de APIs RESTful y GraphQL para un flujo de datos fluido y seguro entre cliente y servidor.",
    },
    {
      icon: <Smartphone className="w-12 h-12 text-yellow-500" />,
      title: "Aplicaciones Móviles",
      description:
        "Desarrollo de aplicaciones móviles nativas y multiplataforma con React Native y Flutter para Android, priorizando rendimiento y usabilidad.",
    },
    {
      icon: <Shield className="w-12 h-12 text-red-500" />,
      title: "Implementación y Seguridad de Servidores",
      description:
        "Configuración y gestión de servidores en Ubuntu Server y Windows Server, incluyendo asesoría en seguridad, implementación de firewalls, prevención de malware y protección de contenedores.",
    },
    {
      icon: <Terminal className="w-12 h-12 text-pink-500" />,
      title: "DevOps & Infraestructura",
      description:
        "Automatización de despliegues y creación de pipelines de CI/CD, orquestación de contenedores con Docker y LXC, monitoreo y optimización continua de la infraestructura.",
    },
    {
      icon: <Database className="w-12 h-12 text-orange-500" />,
      title: "Despliegue de Plataformas y Sistemas de Gestión",
      description:
        "Instalación y personalización de plataformas como Odoo, WordPress y Zimbra. Configuración de bases de datos y optimización de servidores para un rendimiento y seguridad óptimos.",
    },
    {
      icon: <Workflow className="w-12 h-12 text-lime-500" />,
      title: "RPA y Automatización de Procesos",
      description:
        "Automatización integral de tareas y flujos de trabajo utilizando herramientas RPA (UiPath, Power Automate, Automation Anywhere), incluyendo scraping y análisis de datos para maximizar la eficiencia y la precisión en los procesos.",
    }
    
  ]

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Mis Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-2xl font-semibold ml-4 dark:text-white">{service.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
