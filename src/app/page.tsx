// import "server-only"
// "use client"

import React, { Suspense } from "react"
import classNames from "classnames"
import styles from "./welcome.module.scss"
import { Col, Row } from "@/components/CustomTags"
import ItemList from "@/components/ItemList"
import { SkeletonGrid } from "@/components/Skeleton"
import QuickLinksCards from "@/components/QuickLinksCards"

// ---------------------
// types
// ---------------------
interface propsType {
  params: any
  searchParams: any
}

export const revalidate = 5

export default async function Home({ params, searchParams }: propsType) {
  //

  return (
    <section className={styles.welcome}>
      <Row className={classNames(styles.row, styles)}>
        <Col className={classNames(styles.logos)}>
          <img
            src="/lio-logo.svg"
            alt="LIO los inorgánicos organizados"
            height={130}
          />

          {/* <a href="https://www.principiosyvalores.org/" target="_blank"> */}
          <img
            className={styles.logoPyV}
            src="/pyv-logo.svg"
            alt="Principios y Valores"
            height={130}
          />
          {/* </a> */}
        </Col>
        <Col className={classNames(styles.comunicate)}>
          <span className={styles.title}>comunicate</span>
          <a
            href="https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w"
            target="_blank"
          >
            Whatsapp <img src="/whatsapp.svg" alt="whatsapp" />
          </a>
        </Col>
        <Col className={classNames(styles.social)}>
          <span className={styles.title}>Seguinos</span>
          <div className={classNames(styles.socialLinks)}>
            <a
              href="https://www.instagram.com/lio_losinorganicosorganizados"
              target="_blank"
            >
              <img src="/instagram.svg" alt="instagram" />
            </a>
            <a
              href="https://www.facebook.com/losinorganicosorganizados"
              target="_blank"
            >
              <img src="/facebook.svg" alt="facebook" />
            </a>
            <a href="https://www.tiktok.com/@lio_nacional" target="_blank">
              <img src="/tiktok.svg" alt="tiktok" />
            </a>
            <a href="https://twitter.com/Hacemos_Lio" target="_blank">
              <img src="/twitter.svg" alt="twitter" />
            </a>
            <a
              href="https://www.youtube.com/@losinorganicosorganizados4394/"
              target="_blank"
            >
              <img src="/youtube.svg" alt="youtube" />
            </a>
            {/* <a href="https://t.me/lioenpyv" target="_blank">
              <img src="/telegram.svg" alt="telegram" />
            </a> */}
          </div>
        </Col>
      </Row>
    </section>
  )
}
