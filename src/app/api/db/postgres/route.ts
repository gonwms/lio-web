import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

// create/delete table con url ----------------------------------------------------------------
// localhost:3000/api/db/postgres?method=create&name=wascardio

export async function GET(request: any): Promise<void | Response> {
  const { searchParams } = new URL(request.url)
  const method = searchParams.get('method')
  const name = searchParams.get('name')
  console.log(method)
  if (method === 'create') {
    try {
      const result = await sql`CREATE TABLE ${name} ( Name varchar(255), Owner varchar(255) );`
      return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }
  if (method === 'delete') {
    try {
      const result = await sql`DELETE TABLE Pets ;`
      return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }
}
