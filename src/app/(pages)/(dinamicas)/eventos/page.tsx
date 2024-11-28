import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'

// SEO
export async function generateMetadata({ params }: any) {
  return seo({
    title: 'Eventos',
    subTitle: 'Calendario de eventos',
    tags: 'Eventos, calendario',
    visibility: 'Público',
    cover: 'https://www.lio.com.ar/cover.webp',
    slug: `https://www.lio.com.ar/eventos`
  })
}

export default function Eventos() {
  return (
    <>
      <h1 className={styles.plp}>Eventos</h1>
      <ItemsInfiniteScroll resourceType="events" />
    </>
  )
}
