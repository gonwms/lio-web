import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'
import Breadcrumb from '@/components/breadcrumb'

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
      <Breadcrumb type={'tienda'} />
      <ItemsInfiniteScroll resourceType="products" />
    </>
  )
}
