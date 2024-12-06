'use client'

import classNames from 'classnames'
import styles from './itemsList.module.scss'
import { getResource } from '@/actions'
import ItemSmallCard from './itemSmallCard'
import { useState, useEffect } from 'react'
import formatDataType from '@/libs/formatDataType'

interface propsType {
  resource: 'docs' | 'posts' | 'events' | 'products'
  pageSize?: number
  page?: number
  deep?: string
  sort?: string
  filters?: string
  className?: string
}

export default function ItemsRelated(props: propsType) {
  const { resource, pageSize, page, deep, sort, filters, className } = props
  const [dataState, setDataState] = useState<any>([])
  const [error, setError] = useState<any>(null)

  // ------------------------------------------
  // fetch data
  // ------------------------------------------

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getResource({
        resource,
        pageSize,
        page,
        deep,
        sort,
        filters
      })

      setDataState(data)
      setError(error)
    })()
  }, [])

  // ------------------------------------------
  // Render
  // ------------------------------------------
  if (error) {
    return <span>{error.message}</span>
  }
  if (dataState?.length === 0) {
    // return <h3>no hay resultados</h3>
  }

  return (
    <>
      <div className={classNames(className)}>
        {dataState.data?.map((item: any) => {
          return (
            window.location.pathname.split('/').pop() !==
              item.attributes.slug && (
              <ItemSmallCard
                data-key={`${item.attributes.type}-${item.id}`}
                key={`${item.attributes.type}-${item.id}`}
                item={item}
              />
            )
          )
        })}
      </div>
    </>
  )
}
