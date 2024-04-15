// import { sql } from '@vercel/postgres'
// import { NextResponse } from 'next/server'

// interface PostRequest {
//   proof: string
// }
// export async function POST(request: any): Promise<void | Response> {
//   const { proof }: PostRequest = await request.json()
//   try {
//     if (!proof) return NextResponse.json('data required', { status: 500 })
//     //
//     await sql`INSERT INTO consentproof (Data) VALUES (${proof});`

//     const result = await sql`SELECT * FROM consentproof;`
//     return NextResponse.json({ result }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 })
//   }
// }
