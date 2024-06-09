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
              <div className={styles.picture}>
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
              </div>
            )}
            {!miniatura && (
              <picture>
                <img src="/no-image.webp" alt="no image" />
              </picture>
            )}
            <div className={styles.headerContent}>
              <h1>{data?.attributes?.title}</h1>
              <h2>
                Guillermo Moreno presenta el consejo superior nacional
                justicialista en ferro en 1 de junio a las 17 horas en av las
                heras
              </h2>
              <div className={styles.meta}>
                <span>{formatDate(data?.attributes?.publishedAt)}</span>
                {data?.attributes?.author && (
                  <span>{data?.attributes?.author}</span>
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
