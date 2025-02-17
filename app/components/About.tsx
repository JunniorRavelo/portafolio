"use client"

import { motion } from "framer-motion"
import { Database, Server, Bolt, AppWindow, Bot, PackagePlus } from "lucide-react"
import Image from "next/image"

export default function About() {
  const skills = [
    { icon: <AppWindow className="w-8 h-8 text-blue-500" />, title: "Front-end", description: "React, Next.js, Vue.js" },
    { icon: <Bolt className="w-8 h-8 text-green-500" />, title: "Back-end", description: "Node.js, Express, Golang, Flask" },
    { icon: <Database className="w-8 h-8 text-purple-500" />, title: "Base de datos", description: "MongoDB, PostgreSQL, MySQL, SQL Server" },
    { icon: <Server className="w-8 h-8 text-yellow-500" />, title: "Servidores", description: "Ubuntu Server, Windows Server" },
    { icon: <Bot className="w-8 h-8 text-yellow-500" />, title: "RPA/BPA", description: "Scraping, UiPath, Power Automate, Automation Anywhere" },
    { icon: <PackagePlus className="w-8 h-8 text-yellow-500" />, title: "Otros", description: "Git, LXC, Docker, Odoo, WordPress, Zimbra" },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Acerca de mí
        </motion.h2>
        <div className="flex flex-col md:flex-row items-start justify-between">
          <motion.div
            className="md:w-1/2 lg:w-3/5 mb-8 md:mb-0 md:pr-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Desarrollador full-stack con experiencia en React, Next.js, Vue.js, Node.js, Golang y Flask, creando aplicaciones web escalables y eficientes. Experto en bases de datos como MongoDB, PostgreSQL, MySQL y SQL Server, y en la gestión de servidores con Ubuntu Server y Windows Server.
            </p>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Especialista en automatización de procesos con UiPath, Power Automate, Automation Anywhere y scraping, optimizando flujos de trabajo. Manejo avanzado de Git, Docker, LXC, y plataformas como Odoo y WordPress, garantizando soluciones integrales y de alto rendimiento.
            </p>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              Enfocado en la seguridad, aplico prácticas como cifrado de datos, control de accesos, protección contra ataques DDoS y gestión segura de credenciales, garantizando la integridad, confidencialidad y disponibilidad de la información en cada proyecto.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20" style={{ display: "none" }}>
        <Image
          src="/images/placeholder.svg"
          alt="Fondo decorativo"
          width={256}
          height={256}
        />
      </div>
    </section>
  )
}
