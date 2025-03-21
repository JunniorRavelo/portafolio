import { NextResponse } from "next/server"

export async function GET() {
  try {
    const token = process.env.MY_GITHUB_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: "Falta el token de GitHub en variables de entorno." },
        { status: 500 }
      )
    }

    // Reemplaza 'Bearer' por 'token' si tu token es Clásico (Personal Access Token)
    const res = await fetch("https://api.github.com/user/repos?visibility=public", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Next.js",
      },
      cache: "no-store", // evita que Next.js haga caché
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
