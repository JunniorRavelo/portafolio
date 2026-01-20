import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "J. Santiago Ravelo - Desarrollador Web en Cúcuta, Colombia",
  description:
    "Portafolio de Junnior Santiago Ravelo Velasco, desarrollador web profesional en Cúcuta. Proyectos, contacto y experiencia.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      {/* Google Analytics Scripts */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-MGRT2YCV10"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MGRT2YCV10');
        `}
      </Script>

      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Junnior Santiago Ravelo Velasco",
            "url": "https://ceo.misistema.com.co",
            "address": {
              "@type": "PostalAddress",
              "postalCode": "540011",
              "addressLocality": "Cúcuta",
              "addressRegion": "Norte de Santander",
              "addressCountry": "Colombia"
            },
            "sameAs": [
              "https://www.linkedin.com/in/jsravelo/",
              "https://github.com/JunniorRavelo",
              "https://maps.app.goo.gl/V9MtUSsHRhWUg8PK6"
            ]
          }
        `}
      </Script>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
