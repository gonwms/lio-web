// app/api/webhook/route.js

import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// FUNCION SE EJECUTA EN WEBHOOKS THE STRAPI
export async function POST(request: any) {
  const body = await request.json()
  const slug = body?.entry?.slug
  const type = body?.entry?.type

  if (slug && type) {
    revalidatePath(`/${type}/${slug}`)
    return NextResponse.json({ message: `path updated: /${type}/${slug}` })
  } else {
    return NextResponse.json(
      { message: "Not type not slug found in request body" },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
}
