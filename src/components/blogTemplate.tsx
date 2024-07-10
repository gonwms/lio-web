"use client"

import React, { useEffect, useState } from "react"
import CustomBlocksRenderer from "@/components/CustomBlocksRenderer"
import styles from "./blogTemplate.module.scss"
import formatDataType from "@/libs/formatDataType"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"
import "@/styles/lightbox.css"
import classNames from "classnames"
import dayjs from "dayjs"
import "dayjs/locale/es"
import { BlogDateTag } from "./DateTags"

dayjs.locale("es")
export const revalidate = 3600

export default function BlogTemplate({ data }: any) {
  //

  const cover = data?.attributes?.cover?.data?.attributes
  const allContentBlocks = [
    { id: 0, __component: "texto.texto", content: data?.attributes?.content },
    ...data?.attributes?.contents,
  ]

  // const img_xl = image?.formats as { xl_webp: { url: string } }

  const [album, setAlbum] = useState<{ src: string }[]>([])
  const [index, setIndex] = useState(-1)

  // Lightbox
  const [animationDuration, setAnimationDuration] = useState(500)
  const [maxZoomPixelRatio, setMaxZoomPixelRatio] = useState(1)
  const [zoomInMultiplier, setZoomInMultiplier] = useState(2)
  const [doubleTapDelay, setDoubleTapDelay] = useState(300)
  const [doubleClickDelay, setDoubleClickDelay] = useState(300)
  const [doubleClickMaxStops, setDoubleClickMaxStops] = useState(2)
  const [keyboardMoveDistance, setKeyboardMoveDistance] = useState(50)
  const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = useState(100)
  const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = useState(100)
  const [scrollToZoom, setScrollToZoom] = useState(false)

  const onClick = (index: number) => {
    setIndex(index)
    // console.log(album)
  }
  // buscar todas las imágenes y almacenarlas en album
  useEffect(() => {
    if (index !== -1) return
    const images = Array.from(
      document.querySelectorAll(`.${styles.content} img`)
    ) as HTMLImageElement[]
    const albums = images.map((image) => {
      return { src: image.src.replace("md_webp_", "xl_webp_") }
    })
    setAlbum(albums)
  }, [])

  // agregar click a todas las imagenes para abrir el lightbox
  useEffect(() => {
    if (index !== -1) return
    const images = Array.from(
      document.querySelectorAll(`.${styles.content} img`)
    ) as HTMLImageElement[]
    images?.forEach((img, index) => {
      img.addEventListener("click", () => onClick(index))
      img.style.cursor = "pointer"
    })
  }, [album, index])

  /*--------------------------------
   * HANDLE TYPES
   *------------------------------  */
  const type: { path: string; ico: string } = formatDataType(
    data?.attributes?.type
  )

  /*--------------------------------
   * HANDLE CONTENTS BLOCKS
   *-------------------------------  */
  const contents = allContentBlocks.reduce((acc: any, curr: any, index) => {
    switch (curr.__component) {
      //  TEXTOS
      case "texto.texto":
        return [
          ...acc,
          <CustomBlocksRenderer
            key={index}
            id={index}
            content={curr.content}
          />,
        ]
        break

      //  GALERIA
      case "galeria.galeria":
        //
        const images = curr.galeria.data.reduce((acc: any, cur: any) => {
          return [...acc, cur.attributes.name]
        }, [])
        return [...acc, images]
        break

      //  VIDEO
      case "video.video":
        //
        const videoURL = curr.url.includes("watch?v=")
          ? curr.url.split("watch?v=")[1]
          : curr.url.split("/").pop()
        return [
          ...acc,
          <iframe
            className={styles.youtube}
            key={curr.id}
            src={`https://www.youtube.com/embed/${videoURL}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder={0}
          ></iframe>,
        ]
        break
      default:
        return [acc]
        break
    }
  }, [])

  // RENDER  ----------------------
  return (
    <>
      {data && (
        <div className={styles.blogTemplate}>
          <div className={styles.header}>
            <div className={styles.picture}>
              {cover && (
                <picture>
                  <source
                    media="(max-width: 480px)"
                    srcSet={cover.formats.sm_webp?.url}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 481px) and (max-width: 960px)"
                    srcSet={cover.formats.md_webp?.url}
                    type="image/webp"
                  />
                  <img
                    src={cover.formats.xl_webp?.url}
                    alt={data?.attributes.title}
                  />
                </picture>
              )}
              {!cover && (
                <picture>
                  <img src="/no-image.webp" alt="no image" />
                </picture>
              )}
            </div>
            <div className={styles.headerContent}>
              <div>
                <h1>{data?.attributes?.title}</h1>

                {data.attributes.type === "events" && (
                  <BlogDateTag data={data} styles={styles} />
                )}
              </div>
              <h2>{data?.attributes?.subTitle}</h2>
              <div className={classNames(styles.tags, styles.tagCategory)}>
                {/* {console.log(
                  data.attributes[`category_${data?.attributes?.type}`]?.data
                )} */}
                {data.attributes[`category_${data?.attributes?.type}`] &&
                  data.attributes[
                    `category_${data?.attributes?.type}`
                  ].data?.map((cat: any) => (
                    <span key={cat.id}>{cat.attributes.name}</span>
                  ))}
              </div>
              <div className={styles.meta}>
                <img src={type.ico} alt={type.path} height={14} width={14} />
                <span>
                  publicado el{" "}
                  {dayjs(data.attributes.publishedAt).format("DD/MM/YY")}
                </span>
                {data?.attributes?.author && (
                  <span>
                    <img
                      src="/ico-pen.svg"
                      alt={type.path}
                      height={14}
                      width={14}
                    />
                    por {data?.attributes?.author}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.content}>{contents}</div>
        </div>
      )}

      <Lightbox
        className={styles.lightbox}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={album}
        plugins={[Zoom]}
        animation={{ zoom: animationDuration }}
        zoom={{
          maxZoomPixelRatio,
          zoomInMultiplier,
          doubleTapDelay,
          doubleClickDelay,
          doubleClickMaxStops,
          keyboardMoveDistance,
          wheelZoomDistanceFactor,
          pinchZoomDistanceFactor,
          scrollToZoom,
        }}
      ></Lightbox>
    </>
  )
}
