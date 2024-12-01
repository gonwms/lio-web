'use client'

import React, { useEffect, useState } from 'react'

import styles from './blogTemplate.module.scss'
import formatDataType from '@/libs/formatDataType'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import '@/styles/lightbox.css'
import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { BlogDateTag } from './DateTags'
import HTMLRenderer from './HTMLRenderer'
import { json } from 'stream/consumers'
import { Carousel } from './Carousel'
import ShareBar from './shareBar'

dayjs.locale('es')
export const revalidate = 3600

export default function BlogTemplate({ data }: any) {
  //

  const cover = data?.attributes?.cover?.data?.attributes

  /*--------------------------------
   * HANDLE CONTENTS BLOCKS
   *-------------------------------  */
  // format content as extra block content
  const allContentBlocks = [
    {
      id: 0,
      __component: 'texto.texto',
      contentck: data?.attributes?.contentck
    },
    ...(data?.attributes?.contents ? data.attributes.contents : [])
  ]

  // render blocks
  const contents = allContentBlocks.reduce((acc: any, curr: any, index) => {
    switch (curr.__component) {
      //  TEXTOS
      case 'texto.texto':
        return [
          ...acc,
          <HTMLRenderer key={index} id={index} content={curr.contentck} />
        ]
        break

      //  GALERIA
      case 'galeria.galeria':
        //
        const images = curr.galeria.data.reduce((acc: any, cur: any) => {
          return [
            ...acc,
            <img
              key={cur.attributes.id}
              src={cur.attributes.formats.md_webp.url}
              alt={cur.attributes.alternativeText}
            />
          ]
        }, [])
        return [
          ...acc,
          <Carousel
            key={curr.id}
            settings={{
              slidesToShow: images.length > 2 ? 3 : 2,
              infinite: false,
              centerMode: false
              // variableWidth: true,
            }}
          >
            {images}
          </Carousel>
        ]
        break

      //  VIDEO
      case 'video.video':
        //
        // handle 2 url formats
        const videoURL = curr.url.includes('watch?v=')
          ? curr.url.split('watch?v=')[1] //https://www.youtube.com/watch?v=3AFjscM-5vQ
          : curr.url.split('/').pop() // https://youtu.be/3AFjscM-5vQ
        return [
          ...acc,
          <iframe
            className={styles.youtube}
            key={curr.id}
            src={`https://www.youtube.com/embed/${videoURL}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder={0}
          ></iframe>
        ]
        break
      default:
        return [acc]
        break
    }
  }, [])

  // Lightbox
  const [indexLightbox, setIndexLightbox] = useState(-1)
  const [albumLightbox, setAlbumLightbox] = useState<{ src: string }[]>([])
  const [animationDuration, setAnimationDuration] = useState(500)
  const [maxZoomPixelRatio, setMaxZoomPixelRatio] = useState(1)
  const [zoomInMultiplier, setZoomInMultiplier] = useState(2)
  const [doubleTapDelay, setDoubleTapDelay] = useState(300)
  const [doubleClickDelay, setDoubleClickDelay] = useState(300)
  const [doubleClickMaxStops, setDoubleClickMaxStops] = useState(2)
  const [keyboardMoveDistance, setKeyboardMoveDistance] = useState(50)
  const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = useState(100)
  const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = useState(100)
  const [scrollToZoom, setScrollToZoom] = useState(false)

  const onClick = (index: number) => {
    setIndexLightbox(index)
    // console.log(album)
  }
  // buscar todas las imágenes y almacenarlas en album
  useEffect(() => {
    if (indexLightbox !== -1) return
    const images = Array.from(
      document.querySelectorAll(`.${styles.content} img`)
    ) as HTMLImageElement[]
    const albums = images.map((image) => {
      return {
        src: image.src.replace('md_webp_', 'xl_webp_')
      }
    })
    setAlbumLightbox(albums)
  }, [])

  // agregar click a todas las imagenes para abrir el lightbox
  useEffect(() => {
    if (indexLightbox !== -1) return
    const images = Array.from(
      document.querySelectorAll(`.${styles.content} img`)
    ) as HTMLImageElement[]
    images?.forEach((img, index) => {
      img.addEventListener('click', () => onClick(index))
      img.style.cursor = 'pointer'
    })
  }, [albumLightbox, indexLightbox])

  /*--------------------------------
   * HANDLE TYPES
   *------------------------------  */
  const type: { path: string; ico: string } = formatDataType(
    data?.attributes?.type
  )

  // RENDER  ----------------------
  return (
    <>
      {data && (
        <div className={styles.blogTemplate}>
          <div className={styles.header}>
            <div className={styles.picture}>
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
                    alt={data?.attributes.title}
                  />
                </picture>
              )}
              {!cover && (
                <picture>
                  <img src="/no-image.webp" alt="no image" />
                </picture>
              )}
            </div>
            <div className={styles.headerContent}>
              <div>
                <h1>{data?.attributes?.title}</h1>
              </div>
              <h2>{data?.attributes?.subTitle}</h2>
              {/* TAGS */}

              {data?.attributes?.[`category_${data?.attributes?.type}`]?.data
                ?.length > 0 && (
                <div className={classNames(styles.tags, styles.tagCategory)}>
                  {data.attributes[`category_${data?.attributes?.type}`] &&
                    data.attributes[
                      `category_${data?.attributes?.type}`
                    ].data?.map((cat: any) => (
                      <span key={cat.id}>{cat.attributes.name}</span>
                    ))}
                </div>
              )}
              {/* DATE */}
              {data?.attributes?.type === 'events' && (
                <BlogDateTag data={data} styles={styles} />
              )}
              {/* META */}
              {data?.attributes?.type !== 'events' && (
                <div className={styles.meta}>
                  <span>
                    <img
                      src={type.ico}
                      alt={type.path}
                      height={14}
                      width={14}
                    />
                    creado el{' '}
                    {dayjs(data.attributes.publishedAt).format('DD/MM/YY')}
                  </span>
                  {data?.attributes?.author && (
                    <span>
                      <img
                        src="/ico-pen.svg"
                        alt={type.path}
                        height={14}
                        width={14}
                      />
                      por {data?.attributes?.author}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className={styles.content}>
            {contents}
            {/* {data?.attributes?.contentck && (
              <HTMLRenderer data={data?.attributes?.contentck} />
            )} */}
          </div>
          {/* share */}
          <ShareBar data={data} />
        </div>
      )}

      <Lightbox
        className={styles.lightbox}
        index={indexLightbox}
        open={indexLightbox >= 0}
        close={() => setIndexLightbox(-1)}
        slides={albumLightbox}
        plugins={[Zoom]}
        animation={{ zoom: animationDuration }}
        zoom={{
          maxZoomPixelRatio,
          zoomInMultiplier,
          doubleTapDelay,
          doubleClickDelay,
          doubleClickMaxStops,
          keyboardMoveDistance,
          wheelZoomDistanceFactor,
          pinchZoomDistanceFactor,
          scrollToZoom
        }}
      ></Lightbox>
    </>
  )
}
