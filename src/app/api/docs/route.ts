import { NextResponse, NextRequest } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL
// const API_URL = "http://127.0.0.1:1337"

export async function getDocs(req: any): Promise<NextResponse> {
  const { page, pageSize, deep, sort } = req
  const endpoint = {
    url: `${API_URL}/api/docs`,
    deep: `?populate=deep,${deep ? deep : 2}`,
    sort: `&sort=${sort ? sort : "rank:asc"}`,
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 3}`,
    page: `&pagination[page]=${page ? page : 1}`,
  }
  const endpointString = Object.values(endpoint).join("")

  try {
    const res = await fetch(endpointString)
    const data = await res.json()
    // Delay the response for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (data) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json(res)
    }
  } catch (error) {
    return NextResponse.json(error)
  }
}

// export async function postPosts(): Promise<void | Response> {
//   return NextResponse.json("assas")
// }

// export async function putPosts(): Promise<void | Response> {
//   return NextResponse.json("assas")
// }

// export async function deletePosts(): Promise<void | Response> {}
