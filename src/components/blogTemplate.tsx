import React from "react"

import CustomBlocksRenderer from "@/components/CustomBlocksRenderer"
import styles from "./blogTemplate.module.scss"
import { formatDate } from "@/libs/formateDate"
import formatDataType from "@/libs/formatDataType"

export default function BlogTemplate({ data }: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const cover = data?.attributes?.cover?.data?.attributes

  /*--------------------------------
   * HANDLE TYPES
   *------------------------------  */
  const type: { path: string; ico: string } = formatDataType(
    data?.attributes?.type
  )
  /*--------------------------------
   * HANDLE EXTRA CONTENTS BLOCKS
   *-------------------------------  */
  const extrablocks = data?.attributes?.contents

  const extraContents = extrablocks?.reduce((acc: any, curr: any) => {
    switch (curr.__component) {
      //
      //  TEXTOS
      case "texto.texto":
        return [
          ...acc,
          <CustomBlocksRenderer
            key={curr.__component + curr.id}
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

  // RETURN ----------------------
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
                    srcSet={API_URL + cover.formats.sm_webp?.url}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 481px) and (max-width: 960px)"
                    srcSet={API_URL + cover.formats.md_webp?.url}
                    type="image/webp"
                  />
                  <img
                    src={API_URL + cover.formats.xl_webp?.url}
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
              <h1>{data?.attributes?.title}</h1>
              <h2>{data?.attributes?.subTitle}</h2>
              <div className={styles.meta}>
                <img src={type.ico} alt={type.path} height={14} width={14} />
                <span>{formatDate(data?.attributes?.publishedAt)}</span>
                {data?.attributes?.author && (
                  <span>
                    <img
                      src="/ico-pen.svg"
                      alt={type.path}
                      height={14}
                      width={14}
                    />
                    {data?.attributes?.author}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <CustomBlocksRenderer content={data?.attributes?.content} />
            {extraContents}
          </div>
        </div>
      )}
    </>
  )
}
