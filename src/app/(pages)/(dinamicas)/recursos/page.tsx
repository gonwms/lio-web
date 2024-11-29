import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'

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
      <h1 className={styles.plp}>
        LIO <span>Recursos</span>
      </h1>
      <ItemsInfiniteScroll resourceType="docs" />
    </>
  )
}
