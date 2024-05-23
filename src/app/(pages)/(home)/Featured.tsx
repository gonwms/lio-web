import "server-only"

import { getDocs, getPosts } from "@/actions"
import React from "react"
import { Carousel, Settings } from "@/components/Carousel"
import styles from "./home.module.scss"
import ItemCard from "@/components/itemCard"

export default async function Featured() {
  // ------------------------------------------
  // fetch data
  // ------------------------------------------
  const { data, error, meta } = await getPosts({ pageSize: 4 })

  // ------------------------------------------
  // Carousel settings
  // ------------------------------------------

  const settings: Settings = {
    slidesToShow: data?.length >= 3 ? 3 : 1,
    slidesToScroll: 1,
    initialSlide: 1,
    infinite: data?.length > 3 ? false : false,
    dots: data?.length > 3 ? false : false,
    arrows: data?.length > 3 ? true : false,
    speed: 500,
    // autoplay: data?.length >= 4 ? true : false,
    autoplay: false,
    autoplaySpeed: 5000,
    // centerMode: data?.length > 3 ? true : false,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: data?.length > 3 ? true : false,
          draggable: data?.length > 3 ? true : false,
        },
      },
    ],
  }
  //------------------------------------------
  // Render
  //------------------------------------------
  if (error) {
    return <h1>{error.message}</h1>
  }
  if (data?.length === 0) {
    return <h1>no hay resultados</h1>
  }
  return (
    <Carousel settings={settings} className={styles.carousel}>
      {data?.map((item: any) => {
        return (
          <ItemCard
            data-fafa="fafa"
            key={item.id}
            item={item}
            style={{ margin: "10px", border: "3px solid red" }}
          />
        )
      })}
    </Carousel>
  )
}
