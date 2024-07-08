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
          <a
            href="https://lioapi.stream/Plan%20Economico%20Peronista.pdf"
            className={classNames(styles.quickLink, styles.pep)}
            target="_blank"
          >
            <div className={styles.content}>
              <img src="/ico-download.svg" alt="" />
              <div>
                <strong>Plan económico Peronista</strong>
                <span>Descargá: PDF EPUB</span>
              </div>
            </div>
          </a>

          <a
            href="https://lioapi.stream/Plan%20de%20Gobierno%20Peronista.pdf"
            className={classNames(styles.quickLink, styles.pgp)}
            target="_blank"
          >
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

          <a
            href="https://www.youtube.com/@RadioInclusiva/streams"
            className={classNames(styles.quickLink, styles.plan)}
            target="_blank"
          >
            <div className={styles.content}>
              <img src="/ico-cast.svg" alt="" />
              <div>
                <strong>Mundo LIO</strong>
                <span>Los miercoles 20:00hs</span>
              </div>
            </div>
          </a>
        </Carousel>
      )}
    </>
  )
}
