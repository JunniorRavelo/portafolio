"use client"

import { Briefcase, Calendar, MapPin, Globe } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function Experience() {
  const experiences = [
    {
      company: "Freelance",
      location: "Remoto",
      period: "2022 - Presente",
      role: "DevOps Full Stack",
      responsibilities: [
        "Desarrollo de sistemas a la medida para automatizar procesos y optimizar operaciones internas",
        "Implementación y mantenimiento de plataformas como Odoo, WordPress y Zimbra en entornos Linux y Windows",
        "Despliegue de software open source y soluciones de pago con licencias, asegurando compatibilidad y cumplimiento legal",
        "Creación de pipelines de CI/CD utilizando Git, Docker y LXC para asegurar entregas ágiles y escalables",
        "Orquestación de contenedores y monitoreo de servicios para una gestión de infraestructura eficiente",
        "Asesoría a clientes en prácticas de DevOps, mejores arquitecturas y despliegues de software",
      ],
    },
    {
      company: "P&C Marketing S.A.A",
      location: "Híbrido",
      period: "2020 - 2023",
      role: "Clicker",
      responsibilities: [
        "Diseño e implementación de flujos RPA para la recolección y limpieza de bases de datos",
        "Automatización de tareas repetitivas utilizando UiPath y Power Automate",
        "Generación de reportes y análisis de datos para la toma de decisiones en campañas de marketing",
        "Coordinación con el equipo de marketing para optimizar la segmentación y alcance de las campañas",
        "Monitoreo y mejora continua de los procesos de automatización para garantizar la calidad de la información",
      ],
    },
    {
      company: "Smartphone Center",
      location: "Colombia, Cúcuta",
      period: "2016 - 2020",
      role: "Técnico de Smartphones y computadoras",
      responsibilities: [
        "Diagnóstico y reparación de dispositivos móviles (Android e iOS), equipos de escritorio y portátiles",
        "Mantenimiento preventivo y correctivo de hardware para asegurar la máxima eficiencia",
        "Instalación, configuración y actualización de sistemas operativos y aplicaciones",
        "Resolución de problemas de red y soporte en la recuperación de datos críticos",
        "Atención al cliente y asesoría técnica para prolongar la vida útil de los dispositivos",
      ],
    },
  ];
  

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Experiencia Profesional" />
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700 rounded-bl-full z-0 opacity-50 
                transition-transform duration-300 group-hover:scale-110"
              ></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 dark:text-white flex items-center">
                  {exp.company === "Freelance" ? <Globe className="w-6 h-6 mr-2 text-blue-500" /> : null}
                  {exp.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {exp.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {exp.period}
                </p>
                <p className="text-xl font-medium mb-4 dark:text-gray-200 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {exp.role}
                </p>
                <ul className="list-none space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Fondo decorativo" width={256} height={256} />
      </div>
    </section>
  )
}
