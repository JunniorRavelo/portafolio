"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Zap } from "lucide-react"
import Image from "next/image"

export default function About() {
  const skills = [
    { icon: <Code className="w-8 h-8 text-blue-500" />, title: "Front-end", description: "React, Next.js, Redux" },
    { icon: <Server className="w-8 h-8 text-green-500" />, title: "Back-end", description: "Node.js, Express, Fastify" },
    { icon: <Database className="w-8 h-8 text-purple-500" />, title: "Base de datos", description: "MongoDB, Mongoose" },
    { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: "Rendimiento", description: "Optimización, Caché" },
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
              Como desarrollador MERN Stack apasionado, me especializo en crear aplicaciones web sólidas y escalables.
              Con una base sólida en MongoDB, Express.js, React y Node.js, desarrollo soluciones full-stack que brindan
              experiencias excepcionales a los usuarios.
            </p>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Mi experiencia se extiende a frameworks modernos como Next.js y herramientas de gestión de estado como
              Redux. Me comprometo a escribir código limpio y eficiente, manteniéndome al día con las últimas tendencias
              de la industria para ofrecer soluciones de vanguardia a mis clientes.
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
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image
          src="/placeholder.svg?height=256&width=256"
          alt="Fondo decorativo"
          width={256}
          height={256}
        />
      </div>
    </section>
  )
}
