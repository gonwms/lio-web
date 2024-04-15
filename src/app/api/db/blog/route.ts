// import { sql } from '@vercel/postgres'
// import { NextResponse } from 'next/server'

// // GET POST ----------------------------------------------------------------
// export async function GET(): Promise<void | Response> {
//   try {
//     const result = await sql`SELECT * FROM blog;`
//     return NextResponse.json({ result }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }
// }

// // POST  ----------------------------------------------------------------
// interface PostRequest {
//   title: string
//   slug: string
// }
// export async function POST(request: any): Promise<void | Response> {
//   const { title, slug }: PostRequest = await request.json()
//   try {
//     if (!title || !slug) return NextResponse.json('title and slug required', { status: 5500 })
//     await sql`INSERT INTO blog (title, slug) VALUES (${title}, ${slug});`

//     const result = await sql`SELECT * FROM blog;`
//     return NextResponse.json({ result }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }
// }
