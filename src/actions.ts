"use server"

import { revalidatePath } from "next/cache"
import { pause } from "@/libs/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export interface req {
  url?: string
  resource: "docs" | "posts" | "events" | "products"
  page?: string | number
  pageSize?: string | number
  deep?: string | number
  sort?: string
  filters?: string
}

const REVALIDATE = { next: { revalidate: 20 } }

// ---------------------------------------------------------------
//  GET RESOURCE
// ---------------------------------------------------------------
export const getResource = async (req: req) => {
  const { resource, page, pageSize, deep, sort, filters } = req
  const endpoint = CreateEndPointString({
    url: API_URL,
    resource: resource,
    page,
    pageSize,
    deep,
    sort,
    filters,
  })

  try {
    console.log(endpoint)
    const res = await fetch(endpoint, REVALIDATE)
    // const wait = pause(2000)
    let data = await res.json()

    if (res.ok) {
      data = JSON.parse(JSON.stringify(data))
      return { data: data }
    } else {
      console.error("❌ endpoint ~", endpoint, "\n❌ data ~", data)
      return { data: data }
    }
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
    return { error: { message: "falló la conexion con el servidor" } }
  }
}

// ---------------------------------------------------------------
//  GET ALL RESOURCE
// ---------------------------------------------------------------
export const getAllResource = async () => {
  const string = `?populate=deep,2&pagination[page]=1&pagination[pagesize]=10&filters[visibility][$eqi]=público`
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs/${string}, REVALIDATE`),
      fetch(`${API_URL}/api/posts/${string}, REVALIDATE`),
      fetch(`${API_URL}/api/events/${string}, REVALIDATE`),
      fetch(`${API_URL}/api/products/${string}, REVALIDATE`),
    ])

    const docs = await docsRes.json()
    const posts = await postsRes.json()
    const events = await eventsRes.json()
    const products = await productsRes.json()

    if (!docsRes.ok || !postsRes.ok || !eventsRes.ok || !productsRes.ok) {
      console.error(
        `❌ actions.ts ~ getAllResource
        \n docs ${JSON.stringify(docs)}
        \n posts ${JSON.stringify(posts)}
        \n events ${JSON.stringify(events)}
        \n products ${JSON.stringify(products)}`
      )
    }

    const data = [
      ...(docs.data ? docs.data : []),
      ...(posts.data ? posts.data : []),
      ...(events.data ? events.data : []),
      ...(products.data ? products.data : []),
    ]
    // pause(5000)
    return { data: data }
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH getAllResource", "\n ❌", error)
    return {
      error: { message: "falló la conexion con el servidor" },
    }
  }
}

// ---------------------------------------------------------------
//  GET FEATURED RESOURCE
// ---------------------------------------------------------------
export const getFeatured = async () => {
  const filter = `?populate=deep,2&filters[featured][$eq]=true&filters[visibility][$eqi]=público`
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs/${filter}`, REVALIDATE),
      fetch(`${API_URL}/api/posts/${filter}`, REVALIDATE),
      fetch(`${API_URL}/api/events/${filter}`, REVALIDATE),
      fetch(`${API_URL}/api/products/${filter}`, REVALIDATE),
    ])
    const docs = await docsRes.json()
    const posts = await postsRes.json()
    const events = await eventsRes.json()
    const products = await productsRes.json()

    if (!docsRes.ok || !postsRes.ok || !eventsRes.ok || !productsRes.ok) {
      console.error(
        `❌ actions.ts ~ getFeatured
        \n docs ${JSON.stringify(docs)}
        \n posts ${JSON.stringify(posts)}
        \n events ${JSON.stringify(events)}
        \n products ${JSON.stringify(products)}`
      )
    }

    const data = [
      ...(docs.data ? docs.data : []),
      ...(posts.data ? posts.data : []),
      ...(events.data ? events.data : []),
      ...(products.data ? products.data : []),
    ]
    // console.log(docs)

    return { data: data }
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
    return { error: { message: "falló la conexion con el servidor" } }
  }
}

// ---------------------------------------------------------------
// UTILS - Create endpoint string
// ---------------------------------------------------------------

const CreateEndPointString = ({
  url,
  resource,
  page,
  pageSize,
  deep,
  sort,
  filters,
}: Partial<req>) => {
  const ep = {
    url: `${url}/api/${resource}`,
    deep: `?populate=deep,${deep ? deep : 2}`,
    sort: `&sort=${sort ? sort : "rank:asc"}`,
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 5}`,
    page: `&pagination[page]=${page ? page : 1}`,
    public: `&filters[visibility][$eqi]=público`,
    filter: filters ? `&filters${filters}` : "",
  }
  const endpointString = Object.values(ep).join("")
  return endpointString
}
