import React from "react"
import styles from "./Item.module.scss"
import Link from "next/link"
import { formatDate } from "@/libs/formateDate"
import formatDataType from "@/libs/formatDataType"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface props {
  item: any
  style?: React.CSSProperties
}

export default function ItemCard({ item, style }: props) {
  const type: { path: string; ico: string } = formatDataType(
    item?.attributes?.type
  )

  const cover = item?.attributes?.cover?.data?.attributes
  return (
    <div
      key={`${item.attributes.type}-${item.id}`}
      className={styles.card}
      style={style}
      data-key={`${item.attributes.type}-${item.id}`}
    >
      <div className={styles.picture}>
        <Link href={`/${type.path}/${item?.attributes?.slug}`}>
          {cover && (
            <picture>
              <source
                media="(max-width <= 600px)"
                srcSet={API_URL + cover.formats.md_webp?.url}
                type="image/webp"
              />
              <source
                media="(min-width < 600px)"
                srcSet={API_URL + cover.formats.sm_webp?.url}
                type="image/webp"
              />
              <img
                src={API_URL + cover.formats.original_webp?.url}
                alt={item?.attributes.title}
              />
            </picture>
          )}
          {!cover && (
            <picture>
              <img src="/no-image.webp" alt={item?.attributes.title} />
            </picture>
          )}
        </Link>
      </div>
      <div className={styles.meta}>
        <img src={type.ico} alt={type.path} height={14} width={14} />
        <span>{formatDate(item.attributes.publishedAt)}</span>

        <span>{item?.attributes.author}</span>
      </div>
      <h3>
        <Link href={`/${type.path}/${item.attributes.slug}`}>
          {item?.attributes.title}
        </Link>
      </h3>
      <p className={styles.excerpt}>
        {/* {item?.attributes?.content?.[0]?.children?.[0].text} */}
        {item?.attributes?.subTitle}
      </p>
    </div>
  )
}
