// import "server-only"
// "use client"

import React, { Suspense } from "react"
import classNames from "classnames"
import styles from "./home.module.scss"
import { Col, Row } from "@/components/CustomTags"

import Featured from "./Featured"
import ItemList from "@/components/ItemList"
import { Carousel, Settings } from "@/components/Carousel"

// ---------------------
// types
// ---------------------
interface propsType {
  params: any
  searchParams: any
}

export default async function Home({
  params,
  searchParams,
}: {
  params: any
  searchParams: any
}) {
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
      {/*
       *
       * ----------------------------- HERO ---------------------
       *
       */}
      <section>
        <Row>
          <Col className={classNames(styles.col)}>
            <div className={styles.banner}>
              <img
                className={styles.logo}
                src="/lio-1t.svg"
                alt="LIO, los inorganicos organizados"
              />
              <span>Nydia Lirola</span>
              <img
                className={styles.foto}
                src="/guillermo-nydia.webp"
                alt="Nydia Lirola y Guillermo Moreno"
              />
              <span>Guillermo Moreno</span>
              <img
                className={styles.logo}
                src="/pyv-1t.svg"
                alt="Principios y Valores"
              />
            </div>
          </Col>
        </Row>
      </section>
      {/*
       *
       * ----------------------------- Cards ---------------------
       *
       */}
      <section>
        {
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
        }
      </section>
      {/*
       *
       * ----------------------------- Highlights ---------------------
       *
       */}
      <section>
        <div>
          <Suspense fallback={<h1>loading featured...</h1>}>
            <Featured />
          </Suspense>
        </div>
      </section>
      {/*
       *
       * ----------------------------- GRILLA ---------------------
       *
       */}
      <section>
        <Row>
          <Suspense fallback={<h2>aguntá makina</h2>}>
            {/* <ItemListProvider> */}
            <ItemList req={searchParams} />
            {/* </ItemListProvider> */}
          </Suspense>
        </Row>
      </section>
    </>
  )
}
