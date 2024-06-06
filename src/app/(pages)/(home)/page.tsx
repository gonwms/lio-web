// import "server-only"
// "use client"

import React, { Suspense } from "react"
import classNames from "classnames"
import styles from "./home.module.scss"
import { Col, Row } from "@/components/CustomTags"

import Featured from "./Featured"
import ItemList from "@/components/ItemList"
import { Carousel, Settings } from "@/components/Carousel"
import SkeletonGrid from "@/components/SkeletonGrid"
import QuickLinksCards from "@/components/QuickLinksCards"

// ---------------------
// types
// ---------------------
interface propsType {
  params: any
  searchParams: any
}

export default async function Home({ params, searchParams }: propsType) {
  //

  return (
    <>
      {/*
       *
       * ----------------------------- HERO BANNER---------------------
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
        <Row>
          <QuickLinksCards />
        </Row>
      </section>
      {/*
       *
       * ----------------------------- Highlights ---------------------
       *
       */}
      <section>
        <div>
          <Suspense fallback={<SkeletonGrid />}>
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
          <Suspense fallback={<SkeletonGrid />}>
            {/* <ItemListProvider> */}
            <ItemList req={searchParams} />
            {/* </ItemListProvider> */}
          </Suspense>
        </Row>
      </section>
    </>
  )
}
