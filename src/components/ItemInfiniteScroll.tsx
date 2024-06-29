"use client"

import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { getResource } from "@/actions"
import ItemCard from "@/components/itemCard"
import styles from "./Item.module.scss"
import { SkeletonGrid } from "./Skeleton"

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
  const [filters, setFilters] = useState<string>("")

  // Fetch
  useEffect(() => {
    console.log("trigger page")
    setLoading(true)
    ;(async () => {
      const { data, error } = await getResource({
        resource: resourceType,
        page: page,
        filters:
          filters !== "" ? `[category][$containsi]=${filters}` : undefined,
      })
      data && page > 1
        ? setData([...dataState, ...data.data])
        : setData(data.data)
      data && setPagination(data?.meta?.pagination)
      error && setError(error)
      setLoading(false)
    })()
  }, [page, filters])

  //Fetch
  // useEffect(() => {
  //   console.log("trigger filter")
  //   setLoading(true)
  //   ;(async () => {
  //     const { data, error } = await getResource({
  //       resource: resourceType,
  //       filters:
  //         filters !== "" ? `[category][$containsi]=${filters}` : undefined,
  //     })
  //     data && setData(data.data)
  //     data && setPagination(data?.meta?.pagination)
  //     error && setError(error)
  //     setLoading(false)
  //   })()
  // }, [filters])

  useEffect(() => {
    console.log("pagination.page: ", pagination?.page)
    console.log("page: ", page)
  }, [pagination, page, filters])

  // ------------------------------------------
  // handlers
  //------------------------------------------

  function handleMoreButtonClick() {
    console.log("handleMoreButtonClick;", pagination.page + 1)
    setPage(pagination.page + 1)
  }

  function handleFilters(e: any) {
    setFilters(e.target.value)
    setPage(1)
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------

  {
    if (error) {
      return <span>{error.message}</span>
    }

    if (dataState?.length === 0 && loading === false) {
      return <h1>no hay resultados</h1>
    }

    // if (page === 1 && loading) {
    //   return <SkeletonGrid count={10} />
    // }
  }
  return (
    <>
      filtrar por categorias
      <select onChange={handleFilters} value={filters}>
        {/* {dataState?.category.map((item, index) => {
          return <option key={index} value="">todos</option>
        
        })} */}
        <option value="defensa">defensa</option>
        <option value="juventud">juventud</option>
        <option value="comunidad">comunidad</option>
      </select>
      <div className={classNames(styles.gridCollection)}>
        {dataState?.map((item: any) => {
          return <ItemCard key={item.id} item={item} />
        })}
      </div>
      {pagination?.page < pagination?.pageCount && (
        <a onClick={handleMoreButtonClick} className={styles.loadMoreBtn}>
          Ver Más
        </a>
      )}
    </>
  )
}
