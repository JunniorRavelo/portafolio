// app/api/projects/route.ts
import { NextResponse } from "next/server"

// Revalida cada 7 días (en segundos)
const REVALIDATE_7_DAYS = 60 * 60 * 24 * 7

export async function GET() {
  try {
    const token = process.env.MY_GITHUB_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: "Falta el token de GitHub en variables de entorno." },
        { status: 500 }
      )
    }

    const res = await fetch("https://api.github.com/user/repos?visibility=public", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Next.js",
      },
      // En Next 13+ puedes usar el objeto `next` para controlar el revalidate
      next: { revalidate: REVALIDATE_7_DAYS },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error al obtener repositorios", status: res.status },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
