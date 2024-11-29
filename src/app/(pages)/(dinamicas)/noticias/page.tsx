import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'

// SEO
export async function generateMetadata({ params }: any) {
  return seo({
    title: 'Noticias',
    subTitle: 'Novedades y noticias',
    tags: 'Novedades y noticias',
    visibility: 'Público',
    cover: 'https://www.lio.com.ar/cover.webp',
    slug: `https://www.lio.com.ar/eventos`
  })
}
export default function Noticias() {
  return (
    <>
      <h1 className={styles.plp}>
        LIO <span>Noticias</span>
      </h1>
      <ItemsInfiniteScroll resourceType="posts" />
    </>
  )
}
