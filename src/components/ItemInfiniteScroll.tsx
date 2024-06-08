"use client"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { getResource } from "@/actions"
import ItemCard from "@/components/itemCard"
import styles from "./Item.module.scss"
import { SkeletonGrid } from "./SkeletonGrid"

interface props {
  resourceType: "events" | "products" | "docs" | "posts"
}

export default function ItemInfiniteScroll({ resourceType }: props) {
  const [page, setPage] = useState(1)
  //
  const [dataState, setData] = useState<any>([])
  const [loading, setLoading] = useState<any>(true)
  const [error, setError] = useState<any>(null)
  const [pagination, setPagination] = useState<any>(null)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const { data, error } = await getResource({
        resource: resourceType,
        page: page,
      })
      data && setData([...dataState, ...data.data])
      data && setPagination(data?.meta?.pagination)
      error && setError(error)
      setLoading(false)
    })()
  }, [page])

  function handleClick() {
    setPage(page + 1)
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------
  if (error) {
    return <span>{error.message}</span>
  }

  if (dataState?.length === 0 && loading === false) {
    return <h1>no hay resultados</h1>
  }

  if (page === 1 && loading) {
    return <SkeletonGrid count={10} />
  }
  return (
    <>
      <div className={classNames(styles.gridCollection)}>
        {dataState?.map((item: any) => {
          return <ItemCard key={item.id} item={item} />
        })}
      </div>
      {pagination?.page < pagination?.pageCount && (
        <a onClick={handleClick} className={styles.loadMoreBtn}>
          Ver Más
        </a>
      )}
    </>
  )
}
