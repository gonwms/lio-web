import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'

// SEO
export async function generateMetadata({ params }: any) {
  return seo({
    title: 'Tienda',
    subTitle: 'tienda peruca',
    tags: 'productos pernonistas',
    visibility: 'Público',
    cover: 'https://www.lio.com.ar/cover.webp',
    slug: `https://www.lio.com.ar/eventos`
  })
}
export default function Tienda() {
  return (
    <>
      <h1 className={styles.plp}>Tienda</h1>
      <ItemsInfiniteScroll resourceType="products" />
    </>
  )
}
