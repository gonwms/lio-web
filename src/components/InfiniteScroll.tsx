"use client"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { getResource } from "@/actions"
import ItemCard from "@/components/itemCard"
import styles from "./Itemslist.module.scss"
import { Button } from "@radix-ui/themes"

export default function InfiniteScroll() {
  const [page, setPage] = useState(1)
  //------------------------------------------
  const [dataState, setData] = useState<any>([])
  const [error, setError] = useState<any>(null)
  const [pagination, setPagination] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const { data, error, meta } = await getResource({
        resource: "docs",
        page: page,
      })
      data && setData([...dataState, ...data])
      error && setError(error)
      meta && setPagination(meta.pagination)
    })()
  }, [page])

  function handleClick() {
    setPage(page + 1)
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------
  if (error) {
    return <h1>{error.message}</h1>
  }
  if (dataState?.length === 0) {
    return <h1>no hay resultados</h1>
  }
  return (
    <>
      <div className={classNames(styles.gridCollection)}>
        {dataState?.map((item: any) => {
          return <ItemCard key={item.id} item={item} />
        })}
      </div>
      {pagination?.page < pagination?.pageCount && (
        <Button onClick={handleClick} size="3" color="gray">
          Ver Más
        </Button>
      )}
    </>
  )
}
