// app/api/webhook/route.js

import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import formatDataType from "@/libs/formatDataType"

// FUNCION SE EJECUTA EN WEBHOOKS THE STRAPI
export async function POST(request: any) {
  const body = await request.json()
  const slug = body?.entry?.slug
  const type = formatDataType(body?.entry?.type)?.path

  if (slug && type) {
    console.log(`/${type}/${slug}`)
    revalidatePath(`/${type}/${slug}`)
    revalidatePath(`/${type}`)
    revalidatePath(`/`)
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
