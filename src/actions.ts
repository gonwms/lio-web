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
  const string = `?populate=deep,2&pagination[page]=1&pagination[pagesize]=10`
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs/${string}, { next: { revalidate: 600 } }`),
      fetch(`${API_URL}/api/posts/${string}, { next: { revalidate: 600 } }`),
      fetch(`${API_URL}/api/events/${string}, { next: { revalidate: 600 } }`),
      fetch(`${API_URL}/api/products/${string}, { next: { revalidate: 600 } }`),
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
  const filter = `?populate=deep,2&filters[featured][$eq]=true`
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs/${filter}`),
      fetch(`${API_URL}/api/posts/${filter}`),
      fetch(`${API_URL}/api/events/${filter}`),
      fetch(`${API_URL}/api/products/${filter}`),
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
