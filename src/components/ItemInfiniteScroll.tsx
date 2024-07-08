"use client"

import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { getResource } from "@/actions"
import ItemCard from "@/components/itemCard"
import styles from "./itemList.module.scss"
import { SkeletonGrid } from "./Skeleton"
import Filters from "@/components/filters"

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
    setLoading(true)
    ;(async () => {
      const { data, error } = await getResource({
        resource: resourceType,
        page: page,
        filters:
          filters !== ""
            ? `[category_${resourceType}][name][$eqi]=${filters}`
            : undefined,
      })
      data && page > 1
        ? setData([...dataState, ...data.data])
        : setData(data.data)
      data && setPagination(data?.meta?.pagination)
      error && setError(error)
      setLoading(false)
    })()
  }, [page, filters])

  // useEffect(() => {
  //   console.log(dataState)
  // }, [dataState])
  // ------------------------------------------
  // handlers
  //------------------------------------------

  function handleMoreButtonClick() {
    setPage(pagination.page + 1)
  }

  function handleFilters(e: any) {
    setFilters(e.target.value)
    setPage(1)
  }

  // ------------------------------------------
  // Render
  // ------------------------------------------

  if (error) {
    return <span>{error.message}</span>
  }

  return (
    <>
      {(resourceType == "docs" || resourceType == "posts") && (
        <>
          <Filters
            className={styles.filters}
            handleFilters={handleFilters}
            filters={filters}
            type={resourceType == "docs" ? "category-docs" : "category-posts"}
          ></Filters>
        </>
      )}
      {/* loading */}
      {page === 1 && loading === true && <SkeletonGrid count={10} />}
      {/* no results */}
      {dataState?.length === 0 ||
        (dataState === null && loading === false && <h1>no hay resultados</h1>)}
      {/* results */}
      {dataState?.length > 0 && !loading && (
        <>
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
      )}
    </>
  )
}
