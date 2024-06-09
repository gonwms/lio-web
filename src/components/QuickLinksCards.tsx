"use client"
import React, { useEffect, useState } from "react"

import styles from "./quickLinks.module.scss"
import { Carousel, Settings } from "./Carousel"
import classNames from "classnames"

export default function QuickLinksCards() {
  //
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const settings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    // initialSlide: 1,
    infinite: false,
    dots: false,
    arrows: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    // centerMode: true,
    // variableWidth: true,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          initialSlide: 0,
          variableWidth: true,
          arrows: true,
          // centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          variableWidth: false,
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          draggable: true,
        },
      },
    ],
  }
  return (
    <>
      {!isClient && <div className={styles.loaderSkeleton}></div>}
      {isClient && (
        <Carousel settings={settings} className={styles.carousel}>
          <a href="#" className={classNames(styles.quickLink, styles.pep)}>
            <div className={styles.content}>
              <img src="/ico-download.svg" alt="" />
              <div>
                <strong>Plan económico Peronista</strong>
                <span>Descargá: PDF EPUB</span>
              </div>
            </div>
          </a>

          <a href="#" className={classNames(styles.quickLink, styles.pgp)}>
            <div className={styles.content}>
              <img src="/ico-download.svg" alt="" />
              <div>
                <strong>Plan de gobierno</strong>
                <span>Descargá: PDF EPUB</span>
              </div>
            </div>
          </a>

          <a href="#" className={classNames(styles.quickLink, styles.plan)}>
            <div className={styles.content}>
              <img src="/ico-credit-card.svg" alt="" />
              <div>
                <strong>Aportes económicos</strong>
                <span>Colaborar</span>
              </div>
            </div>
          </a>

          <a href="#" className={classNames(styles.quickLink, styles.plan)}>
            <div className={styles.content}>
              <img src="/ico-cast.svg" alt="" />
              <div>
                <strong>Mundo LIO</strong>
                <span>Miercoles 19:00hs</span>
              </div>
            </div>
          </a>
        </Carousel>
      )}
    </>
  )
}
