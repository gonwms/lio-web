"use server"

import { revalidatePath } from "next/cache"
import { pause } from "./libs/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

interface req {
  url: string
  path: string
  page: string | number
  pageSize: string | number
  deep: string | number
  sort: string
  filter: string
}

// ---------------------------------------------------------------
//  GET DOCS
// ---------------------------------------------------------------
export const getDocs = async (req: Partial<req>) => {
  const { page, pageSize, deep, sort, filter } = req
  const endpoint = CreateEndPointString({
    url: API_URL,
    path: "docs",
    page,
    pageSize,
    deep,
    sort,
    filter,
  })

  try {
    const res = await fetch(endpoint, { cache: "no-store" })
    let data = await res.json()
    data = JSON.parse(JSON.stringify(data))
    pause(2000) // Delay the response for 2 seconds
    // revalidatePath("/")
    if (res.ok) {
      return data
    } else {
      console.error("❌ actions.ts ~ getDocs")
      console.error("❌ endpoint ~", endpoint)
      console.error("❌ data ~", data)
      return data
    }
  } catch (error) {
    console.error("❌ actions.ts ~ getDocs ~ ❌catch error")
    console.error("❌", error)
    return { error: { message: "server conection fail" } }
  }
}

// ---------------------------------------------------------------
// GET POSTS
// ---------------------------------------------------------------
export const getPosts = async (req: Partial<req>) => {
  const { page, pageSize, deep, sort, filter } = req

  const endpoint = CreateEndPointString({
    url: API_URL,
    path: "posts",
    page,
    pageSize,
    deep,
    sort,
    filter,
  })

  try {
    const res = await fetch(endpoint, { cache: "no-store" })
    let data = await res.json()
    data = JSON.parse(JSON.stringify(data))

    pause(2000) // Delay the response for 2 seconds
    // revalidatePath("/")
    if (res.ok) {
      return data
    } else {
      console.error("❌ actions.ts ~ getPosts")
      console.error("❌ endpoint ~", endpoint)
      console.error("❌ data ~", data)
      return data
    }
  } catch (error) {
    console.error("❌ actions.ts ~ getPosts ~ ❌catch error")
    console.error("❌", error)
    return { error: { message: "server conection fail" } }
  }
}

// ---------------------------------------------------------------
// UTILS - Create endpoint string
// ---------------------------------------------------------------

const CreateEndPointString = ({
  url,
  path,
  page,
  pageSize,
  deep,
  sort,
  filter,
}: Partial<req>) => {
  const ep = {
    url: `${url}/api/${path}`,
    deep: `?populate=deep,${deep ? deep : 2}`,
    sort: `&sort=${sort ? sort : "rank:asc"}`,
    pageSize: `&pagination[pageSize]=${pageSize ? pageSize : 4}`,
    page: `&pagination[page]=${page ? page : 1}`,
    filter: `&filter=${filter ? filter : ""}`,
  }
  const endpointString = Object.values(ep).join("")
  return endpointString
}
