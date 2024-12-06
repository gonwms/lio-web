import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'
import Breadcrumb from '@/components/breadcrumb'

// SEO
export async function generateMetadata({ params }: any) {
  return seo({
    title: 'Recursos',
    subTitle: 'Documentos, recursos y doctrina',
    tags: 'Documentos, recursos, doctrina',
    visibility: 'Público',
    cover: 'https://www.lio.com.ar/cover.webp',
    slug: `https://www.lio.com.ar/eventos`
  })
}
export default function Recursos() {
  return (
    <>
      <Breadcrumb type={'recursos'} />
      <ItemsInfiniteScroll resourceType="docs" />
    </>
  )
}
