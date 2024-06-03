"use server"

import { revalidatePath } from "next/cache"
import { pause } from "./libs/utils"

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
//  GET
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
    let data = await res.json()
    data = JSON.parse(JSON.stringify(data))

    if (res.ok) {
      return data
    } else {
      console.error("❌ endpoint ~", endpoint, "\n❌ data ~", data)
      return data
    }
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
    return { error: { message: "server conection fail" } }
  }
}

// ---------------------------------------------------------------
//  GET
// ---------------------------------------------------------------
export const getAllResource = async () => {
  try {
    const [docsRes, postsRes, eventsRes] = await Promise.all([
      fetch(`${API_URL}/api/docs?populate=deep,2?page=1&pagesize=10`),
      fetch(`${API_URL}/api/posts?populate=deep,2?page=1&pagesize=10`),
      fetch(`${API_URL}/api/events?populate=deep,2?page=1&pagesize=10`),
      // fetch(`${API_URL}/api/products?populate=deep,2?page=1&pagesize=10`),
    ])

    const docs = await docsRes.json()
    const posts = await postsRes.json()
    const events = await eventsRes.json()
    // const products = await productsRes.json()
    if (!docsRes.ok || !postsRes.ok || !eventsRes.ok) {
      console.error(
        `❌ actions.ts ~ getAllResource
         \n docs ${JSON.stringify(docs)}
         \n posts ${JSON.stringify(posts)}
         \n events ${JSON.stringify(events)}`
      )
    }

    console.log("docs")
    console.log(docs)
    return { data: [...docs.data, ...posts.data, ...events.data] }
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH getAllResource", "\n ❌", error)
    return { error: { message: "server conection fail" } }
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
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 3}`,
    page: `&pagination[page]=${page ? page : 1}`,
    filter: `&filter=${filter ? filter : ""}`,
  }
  const endpointString = Object.values(ep).join("")
  return endpointString
}
