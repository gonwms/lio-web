"use server"

import { revalidatePath } from "next/cache"
import { pause } from "@/libs/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

interface req {
  url?: string
  resource: "docs" | "posts" | "events" | "products"
  page?: string | number
  pageSize?: string | number
  deep?: string | number
  sort?: string
  filter?: string
}

// ---------------------------------------------------------------
//  GET RESOURCE
// ---------------------------------------------------------------
export const getResource = async (req: req) => {
  const { resource, page, pageSize, deep, sort, filter } = req
  const endpoint = CreateEndPointString({
    url: API_URL,
    resource: resource,
    page,
    pageSize,
    deep,
    sort,
    filter,
  })

  try {
    const res = await fetch(endpoint)
    console.log(res)
    // const wait = pause(2000)
    let data = await res.json()
    data = JSON.parse(JSON.stringify(data))
    if (res.ok) {
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
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs?populate=deep,2?page=1&pagesize=10`),
      fetch(`${API_URL}/api/posts?populate=deep,2?page=1&pagesize=10`),
      fetch(`${API_URL}/api/events?populate=deep,2?page=1&pagesize=10`),
      fetch(`${API_URL}/api/products?populate=deep,2?page=1&pagesize=10`),
    ])

    const docs = await docsRes.json()
    const posts = await postsRes.json()
    const events = await eventsRes.json()
    const products = await productsRes.json()
    if (!docsRes.ok || !postsRes.ok || !eventsRes.ok) {
      console.error(
        `❌ actions.ts ~ getAllResource
        \n docs ${JSON.stringify(docs)}
        \n posts ${JSON.stringify(posts)}
        \n events ${JSON.stringify(events)}
        \n products ${JSON.stringify(products)}`
      )
    }

    const data = [
      ...(docs.dat ? docs.data : []),
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
// UTILS - Create endpoint string
// ---------------------------------------------------------------

const CreateEndPointString = ({
  url,
  resource,
  page,
  pageSize,
  deep,
  sort,
  filter,
}: Partial<req>) => {
  const ep = {
    url: `${url}/api/${resource}`,
    deep: `?populate=deep,${deep ? deep : 2}`,
    sort: `&sort=${sort ? sort : "rank:asc"}`,
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 5}`,
    page: `&pagination[page]=${page ? page : 1}`,
    // filter: `&filter=${filter ? filter : ""}`,
  }
  const endpointString = Object.values(ep).join("")
  return endpointString
}
