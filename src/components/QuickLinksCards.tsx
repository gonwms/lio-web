import React from "react"

import styles from "./quickLinks.module.scss"
import { Carousel, Settings } from "./Carousel"
import classNames from "classnames"

export default function QuickLinksCards() {
  //
  const settings: Settings = {
    // slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: true,
    dots: false,
    arrows: false,
    speed: 500,
    // autoplay:  >= 4 ? true : false,
    autoplay: false,
    autoplaySpeed: 5000,
    // centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
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
      <Carousel settings={settings}>
        <div>
          <div className={classNames(styles.quickLink, styles.pep)}>
            <img src="/ico-download.svg" alt="" />
            <div>
              <strong>Plan económico Peronista</strong>
              <span>Descargá: PDF EPUB</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classNames(styles.quickLink, styles.pgp)}>
            <img src="/ico-download.svg" alt="" />
            <div>
              <strong>Plan de gobierno</strong>
              <span>Descargá: PDF EPUB</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classNames(styles.quickLink, styles.plan)}>
            <img src="/ico-credit-card.svg" alt="" />
            <div>
              <strong>Aportes económicos</strong>
              <span>Colaborá con el financiamiento</span>
            </div>
          </div>
        </div>
        <div>
          <div className={classNames(styles.quickLink, styles.plan)}>
            <img src="/ico-cast.svg" alt="" />
            <div>
              <strong>Mundo LIO</strong>
              <span>Miercoles 19:00hs</span>
            </div>
          </div>
        </div>
      </Carousel>
    </>
  )
}
