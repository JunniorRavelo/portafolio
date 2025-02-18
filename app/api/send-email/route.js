// /app/api/send-email/route.js

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Transporter SMTP con nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true si usas el puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Enviar correo
    await transporter.sendMail({
      from: process.env.SMTP_FROM,       // Remitente
      to: process.env.SMTP_TO,           // Destinatario (puedes poner un correo fijo o usar email)
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
    return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
  }
}
