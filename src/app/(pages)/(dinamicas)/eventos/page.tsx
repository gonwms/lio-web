import React from 'react'
import ItemsInfiniteScroll from '@/components/ItemInfiniteScroll'
import styles from '../../layout.module.scss'
import seo from '../seoDinamicas'
import { Col, Row } from '@/components/CustomTags'
import Breadcrumb from '@/components/breadcrumb'

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
      <Breadcrumb type={'eventos'} />
      <ItemsInfiniteScroll resourceType="events" />
    </>
  )
}
