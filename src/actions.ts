"use server"

import { revalidatePath } from "next/cache"
import { pause } from "./libs/utils"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

interface req {
  url: string
  resource: "docs" | "posts" | "events" | "products"
  page: string | number
  pageSize: string | number
  deep: string | number
  sort: string
  filter: string
}
type resource = "docs" | "posts" | "events" | "products"
// ---------------------------------------------------------------
//  GET // ---------------------------------------------------------------
export const getResource = async (
  req: { resource: resource } & Partial<req>
) => {
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
    // pause(2000) // Delay the response for 2 seconds
    // revalidatePath("/")
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
