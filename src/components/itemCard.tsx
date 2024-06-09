import React from "react"
import styles from "./Item.module.scss"
import Link from "next/link"
import { formatDate } from "@/libs/formateDate"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface props {
  item: any
  style?: React.CSSProperties
}

export default function ItemCard({ item, style }: props) {
  let path
  let ico
  switch (item.attributes.type) {
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

  const miniatura = item?.attributes?.miniatura?.data?.attributes
  return (
    <div
      key={`${item.attributes.type}-${item.id}`}
      className={styles.card}
      style={style}
      data-key={`${item.attributes.type}-${item.id}`}
    >
      <div className={styles.picture}>
        <Link href={`/${path}/${item?.attributes?.slug}`}>
          {miniatura && (
            <picture>
              <source
                media="(max-width <= 600px)"
                srcSet={API_URL + miniatura.formats.md_webp?.url}
                type="image/webp"
              />
              <source
                media="(min-width < 600px)"
                srcSet={API_URL + miniatura.formats.sm_webp?.url}
                type="image/webp"
              />
              <img
                src={API_URL + miniatura.formats.original_webp?.url}
                alt={item?.attributes.title}
              />
            </picture>
          )}
          {!miniatura && (
            <picture>
              <img src="/no-image.webp" alt={item?.attributes.title} />
            </picture>
          )}
        </Link>
      </div>
      <div className={styles.meta}>
        <img src={ico} alt={path} height={14} width={14} />
        <span>{formatDate(item.attributes.publishedAt)}</span>
        {/* <span>{path}</span> */}
        <span>{item?.attributes.author}</span>
      </div>
      <h3>
        <Link href={`/${path}/${item.attributes.slug}`}>
          {item?.attributes.title}
        </Link>
      </h3>
      <p className={styles.excerpt}>
        {item?.attributes?.content?.[0]?.children?.[0].text}
      </p>
    </div>
  )
}
