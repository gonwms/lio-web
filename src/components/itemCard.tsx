"use client"
import React from "react"
import styles from "./itemCard.module.scss"
import Link from "next/link"

import formatDataType from "@/libs/formatDataType"
import classNames from "classnames"
import dayjs from "dayjs"

dayjs.locale("es")
const now = dayjs()
import "dayjs/locale/es"
// const API_URL = process.env.NEXT_PUBLIC_API_URL

interface props {
  item: any
  style?: React.CSSProperties
}

export default function ItemCard({ item, style }: props) {
  const type: { path: string; ico: string } = formatDataType(
    item?.attributes?.type
  )

  function formatEventDate(date: string) {
    // hoy
    if (now.isSame(date, "day")) return `Hoy ${dayjs(date).format("HH:mm")}hs`
    // mañana
    if (now.add(1, "day").isSame(date, "day"))
      return `mañana ${dayjs(date).format("HH:mm")}hs`
    // en la semana
    if (now.isSame(date, "week") && now.isBefore(date, "day"))
      return `este ${dayjs(date).format("ddd HH:mm")}hs`
    //ya pasó
    if (now.isAfter(date, "day")) return dayjs(date).format("DD/MM/YY")
    // default
    else return dayjs(date).format("DD MMMM")
  }

  const cover = item?.attributes?.cover?.data?.attributes

  // RENDER
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
            <span
              className={
                now.isAfter(item.attributes.event_start, "day")
                  ? styles.past
                  : styles.future
              }
            >
              {now.isSame(item.attributes.event_start, "week") &&
              now
                .subtract(1, "day")
                .isBefore(item.attributes.event_start, "day") ? (
                <img src="/ico-bell-w.svg" alt="" />
              ) : (
                <img src="/ico-eventos-w.svg" alt="" />
              )}

              {formatEventDate(item.attributes.event_start)}
            </span>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <img src={type.ico} alt={type.path} height={14} width={14} />
        <span>
          publicado el {dayjs(item.attributes.publishedAt).format("DD/MM/YY")}
        </span>

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
