import React from "react"
import styles from "./itemCard.module.scss"
import Link from "next/link"
import { formatDate, formatEventDay } from "@/libs/formateDate"
import formatDataType from "@/libs/formatDataType"
import classNames from "classnames"

// const API_URL = process.env.NEXT_PUBLIC_API_URL

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
        <div className={classNames(styles.tags, styles.tagCategory)}>
          {item.attributes.category &&
            item.attributes.category.map((cat: string) => (
              <span key={cat}>{cat}</span>
            ))}
        </div>
        <div className={classNames(styles.tags, styles.tagDate)}>
          {item.attributes.event_start && (
            <span>
              <img src="/ico-bell-w.svg" alt="" />
              {formatEventDay(item.attributes.event_start).day}
            </span>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <img src={type.ico} alt={type.path} height={14} width={14} />
        <span>publicado el {formatDate(item.attributes.publishedAt)}</span>
        <span>por {item?.attributes.author}</span>
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
