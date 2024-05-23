"use client"
import { Grid } from "@radix-ui/themes"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import styles from "./InfiniteScroll.module.scss"
import { getDocs } from "@/actions"
import ItemCard from "@/components/itemCard"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function InfiniteScroll() {
  //------------------------------------------
  // States
  //------------------------------------------
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [meta, setMeta] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const { data, error, meta } = await getDocs({ page: 1 })
      data && setData(data)
      error && setError(error)
      meta && setMeta(meta)
    })()
  }, [])

  // ------------------------------------------
  // Render
  // ------------------------------------------
  if (error) {
    return <h1>{error.message}</h1>
  }
  if (data?.length === 0) {
    return <h1>no hay resultados</h1>
  }
  return (
    <>
      {data?.map((item: any) => {
        return <ItemCard key={item.id} item={item} />
      })}
    </>
  )
}
