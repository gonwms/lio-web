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

  return (
    <>
      {data && (
        <div className={styles.blogTemplate}>
          <div className={styles.header}>
            {miniatura && (
              <picture>
                <source
                  media="(max-width <= 600px)"
                  srcSet={API_URL + miniatura?.formats?.md_avif.url}
                  type="image/avif"
                />
                <source
                  media="(min-width < 600px)"
                  srcSet={API_URL + miniatura?.formats?.sm_avif.url}
                  type="image/avif"
                />
                <img
                  src={API_URL + miniatura?.formats?.original_avif.url}
                  alt={miniatura?.alternativeText}
                />
              </picture>
            )}
            {!miniatura && (
              <picture>
                <img src="/no-image.webp" alt="no image" />
              </picture>
            )}
            <div className={styles.headerContent}>
              <h1>{data?.attributes?.title}</h1>
              <h2>
                Subtitulo hardcodeado Lorem ipsum dolor, sit amet eveniet, enim?
              </h2>
              <div className={styles.publishedAt}>
                {formatDate(data?.attributes?.publishedAt)}
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
