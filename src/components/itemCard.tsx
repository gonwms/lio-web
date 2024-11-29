'use client'
import React from 'react'
import styles from './itemCard.module.scss'
import Link from 'next/link'
import formatDataType from '@/libs/formatDataType'
import classNames from 'classnames'
import dayjs from 'dayjs'

dayjs.locale('es')

import 'dayjs/locale/es'
import { CardDateTag } from './DateTags'
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
                media="(max-width: 768px)"
                srcSet={cover.formats.sm_webp?.url}
                type="image/webp"
              />
              <source
                media="(min-width: 769px) and (max-width: 1920px)"
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
        {/* CATEGORIES */}
        <div className={classNames(styles.tags, styles.tagCategory)}>
          {item.attributes[`category_${item?.attributes?.type}`] &&
            item.attributes[`category_${item?.attributes?.type}`].data?.map(
              (cat: any) => <span key={cat.id}>{cat.attributes.name}</span>
            )}
        </div>

        {/* DATE */}
        {item.attributes.event_start && (
          <div className={classNames(styles.tags, styles.tagDate)}>
            <CardDateTag data={item} styles={styles} />
          </div>
        )}
      </div>

      <div className={styles.meta}>
        <img src={type.ico} alt={type.path} height={14} width={14} />

        <span>{item?.attributes.author}</span>
        {item.attributes.type !== 'events' && (
          <span>
            creado {dayjs(item.attributes.publishedAt).format('DD/MM/YY')}
          </span>
        )}
      </div>

      {/* CONTENT */}
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
