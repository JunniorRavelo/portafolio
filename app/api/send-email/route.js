// /app/api/send-email/route.js

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import * as z from "zod"

// Definir esquema de validación con zod
const schema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(32, "El nombre no debe exceder 32 caracteres")
    .regex(/^[A-Za-z\s]+$/, "El nombre solo puede contener letras y espacios"),
  email: z
    .string()
    .min(6, "El correo debe tener al menos 6 caracteres")
    .max(32, "El correo no debe exceder 32 caracteres")
    .regex(
      /^[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+$/,
      "Formato de correo inválido (solo letras, números, '_', '-', '.' y un '@')"
    ),
  subject: z
    .string()
    .min(4, "El asunto debe tener al menos 4 caracteres")
    .max(32, "El asunto no debe exceder 32 caracteres")
    .regex(/^[A-Za-z\s]+$/, "El asunto solo puede contener letras y espacios"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ0-9\s,\.¿\?]+$/,
      "El mensaje solo puede contener letras, números, espacios, comas, puntos, tildes y signos de interrogación"
    ),
})

export async function POST(request) {
  try {
    const json = await request.json()
    // Validar los datos recibidos
    const { name, email, subject, message } = schema.parse(json)

    // Configurar el transporter SMTP con nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Enviar correo
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // Remitente
      to: process.env.SMTP_TO, // Destinatario
      subject: "Portafolio web: ",
      html: `
        <h2>Portafolio web</h2>
        <p>Has recibido un mensaje de contacto: Jsravelo.site</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    })

    return NextResponse.json({ message: "Correo enviado con éxito" }, { status: 200 })
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
