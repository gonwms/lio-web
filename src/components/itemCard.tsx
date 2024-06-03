import React from "react"
import styles from "./Itemslist.module.scss"
import Link from "next/link"
import { formatDate } from "@/libs/formateDate"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface props {
  item: any
  style?: React.CSSProperties
}

export default function ItemCard({ item, style }: props) {
  let path
  switch (item.attributes.type) {
    case "posts":
      path = "noticias"
      break
    case "events":
      path = "eventos"
      break
    case "docs":
      path = "recursos"
      break
    case "tienda":
      path = "tienda"
      break
    default:
      return ""
  }

  const miniatura = item?.attributes?.miniatura?.data?.attributes
  return (
    <div
      key={item.id}
      className={styles.card}
      style={style}
      data-key={`${item.attributes.type}-${item.id}`}
    >
      {miniatura && (
        <div className={styles.picture}>
          <Link href={`/${path}/${item.attributes.slug}`} scroll={true}>
            <picture>
              <source
                media="(max-width <= 600px)"
                srcSet={API_URL + miniatura.formats.md_avif.url}
                type="image/avif"
              />
              <source
                media="(min-width < 600px)"
                srcSet={API_URL + miniatura.formats.sm_avif.url}
                type="image/avif"
              />
              <img
                src={API_URL + miniatura.formats.original_avif.url}
                alt={miniatura.alternativeText}
              />
            </picture>
          </Link>
        </div>
      )}
      <span className={styles.publishAt}>{item?.attributes.type}</span>
      <span className={styles.publishedAt}>
        {formatDate(item.attributes.publishedAt)}
      </span>
      <h3>{item?.attributes.title}</h3>
      <p className={styles.excerpt}>
        {item?.attributes?.content[0]?.children[0].text}
      </p>
    </div>
  )
}
