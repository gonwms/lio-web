import React from "react"
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"
import styles from "./blogTemplate.module.scss"
import { formatDate } from "@/libs/formateDate"

export default function BlogTemplate({ data }: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const miniatura = data?.attributes?.miniatura?.data?.attributes

  let path
  let ico
  switch (data.attributes.type) {
    case "posts":
      path = "noticias"
      ico = "/ico-noticias.svg"
      break
    case "events":
      path = "eventos"
      ico = "/ico-eventos.svg"
      break
    case "docs":
      path = "recursos"
      ico = "/ico-recursos.svg"
      break
    case "products":
      path = "tienda"
      ico = "/ico-tienda.svg"
      break
    default:
      return ""
  }
  return (
    <>
      {data && (
        <div className={styles.blogTemplate}>
          <div className={styles.header}>
            <div className={styles.picture}>
              {miniatura && (
                <picture>
                  <source
                    media="(max-width <= 600px)"
                    srcSet={API_URL + miniatura?.formats?.md_webp?.url}
                    type="image/webp"
                  />
                  <source
                    media="(min-width < 600px)"
                    srcSet={API_URL + miniatura?.formats?.sm_webp?.url}
                    type="image/webp"
                  />
                  <img
                    src={API_URL + miniatura?.formats?.original_webp?.url}
                    alt={miniatura?.alternativeText}
                  />
                </picture>
              )}
              {!miniatura && (
                <picture>
                  <img src="/no-image.webp" alt="no image" />
                </picture>
              )}
            </div>
            <div className={styles.headerContent}>
              <h1>{data?.attributes?.title}</h1>
              <h2>{data?.attributes?.subTitle}</h2>
              <div className={styles.meta}>
                <img src={ico} alt={path} height={14} width={14} />
                <span>{formatDate(data?.attributes?.publishedAt)}</span>
                {data?.attributes?.author && (
                  <span>
                    <img src="/ico-pen.svg" alt={path} height={14} width={14} />
                    {data?.attributes?.author}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <BlocksRenderer content={data?.attributes?.content} />
          </div>
        </div>
      )}
    </>
  )
}
