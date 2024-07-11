"use server"

import { revalidatePath } from "next/cache"
import { pause } from "@/libs/utils"
import { redirect } from "next/navigation"

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

// const REVALIDATE = { next: { revalidate: 600 } }
const REVALIDATE = { cache: "force-cache" }

// ---------------------------------------------------------------
//  CLEAR REVALIDATE
// ---------------------------------------------------------------
export async function manualClearCache(formData: any) {
  const pathname = formData.get("name")
  const url = new URL(pathname)
  console.log(url.pathname)
  revalidatePath(url.pathname)
  redirect("/cache?clearedPathName=" + url.pathname)
}

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
    // console.log(endpoint)
    const res = await fetch(endpoint, { cache: "force-cache" })
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
  const string = `?populate=deep,2&filters[visibility][$eqi]=público&pagination[page]=1&pagination[pagesize]=15`
  try {
    const [docsRes, postsRes, eventsRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs/${string}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/posts/${string}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/events/${string}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/products/${string}`, { cache: "force-cache" }),
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
    // console.log(data)
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
      fetch(`${API_URL}/api/docs/${filter}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/posts/${filter}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/events/${filter}`, { cache: "force-cache" }),
      fetch(`${API_URL}/api/products/${filter}`, { cache: "force-cache" }),
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
    public: `&filters[visibility][$eqi]=público`,
    sort: `&sort=${sort ? sort : "rank:asc"}`,
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 20}`,
    page: `&pagination[page]=${page ? page : 1}`,
    filter: filters ? `&filters${filters}` : "",
  }
  const endpointString = Object.values(ep).join("")
  return endpointString
}
