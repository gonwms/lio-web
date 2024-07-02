// import "server-only"
"use client"

import { getFeatured } from "@/actions"
import React, { useEffect, useState } from "react"
import { Carousel, Settings } from "@/components/Carousel"

import ItemCard from "@/components/itemCard"
import { SkeletonFeatured } from "@/components/Skeleton"
import useMediaQuery from "@/app/hooks/useMediaQuery"
import styles from "./featured.module.scss"
export default function Featured() {
  //
  const [dataState, setData] = useState<any[] | null>(null)
  const [errorState, setError] = useState<{ message: string }>()

  const mobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    ;(async () => {
      const { data, error } = await getFeatured()
      data !== undefined && setData(data)

      error && setError(error)
    })()
  }, [])

  // ------------------------------------------
  // Carousel settings
  // ------------------------------------------

  const settings: Settings | {} =
    dataState === null
      ? {}
      : {
          slidesToShow: dataState?.length >= 3 ? 3 : 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: dataState?.length > 3 ? false : false,
          dots: dataState?.length > 3 ? false : false,
          arrows: dataState?.length > 3 ? true : false,
          speed: 500,
          autoplay: dataState?.length >= 4 ? true : false,
          // autoplay: false,
          autoplaySpeed: 5000,
          // centerMode: dataState?.length > 3 ? true : false,
          // variableWidth: true,
          responsive: [
            {
              breakpoint: 1552,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                // centerMode: dataState?.length > 3 ? true : false,
                draggable: dataState?.length > 3 ? true : false,
              },
            },
          ],
        }

  //------------------------------------------
  // Render
  //------------------------------------------
  if (errorState) {
    return <span>{errorState?.message}</span>
  }
  if (!dataState) return <SkeletonFeatured count={3} />
  if (dataState?.length === 0) {
    return <h1>no hay resultados</h1>
  }

  return (
    <>
      {mobile === true && (
        <div className={styles.featuredMobile}>
          {dataState?.map((item: any) => {
            return (
              <ItemCard
                key={`${item.attributes.type}-${item.id}`}
                item={item}
              />
            )
          })}
        </div>
      )}
      {mobile === false && (
        <Carousel settings={settings}>
          {dataState?.map((item: any) => {
            return (
              <ItemCard
                key={`${item.attributes.type}-${item.id}`}
                item={item}
              />
            )
          })}
        </Carousel>
      )}
    </>
  )
}