import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Todos los derechos reservados © 2025
        </p>
      </div>
    </footer>
  )
}

export default Footer

