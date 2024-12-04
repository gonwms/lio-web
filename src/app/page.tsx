// import "server-only"

import React from 'react'
import classNames from 'classnames'
import styles from './welcome.module.scss'
import { Col, Row } from '@/components/CustomTags'

// ---------------------
// types
// ---------------------
interface propsType {
  params: any
  searchParams: any
}

const revalidate = 3600

export default async function Welcome({ params, searchParams }: propsType) {
  //

  return (
    <section className={styles.welcome}>
      <Row className={classNames(styles.row, styles)}>
        <Col className={classNames(styles.logos)}>
          <img
            src="/lio-logo.svg"
            alt="LIO los inorgánicos organizados"
            height={110}
          />

          <img
            className={styles.logoPyV}
            src="/pyv-logo.svg"
            alt="Principios y Valores"
            height={110}
          />
        </Col>
        <Col className={classNames(styles.comunicate)}>
          <span className={styles.title}>comunicate</span>
          <a
            href="https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w"
            target="_blank"
          >
            Whatsapp{' '}
            <img src="/social/whatsapp-w.svg" alt="whatsapp" height={30} />
          </a>
        </Col>
        <Col className={classNames(styles.social)}>
          <span className={styles.title}>Seguinos</span>
          <div className={classNames(styles.socialLinks)}>
            <a
              href="https://www.instagram.com/lio_losinorganicosorganizados"
              target="_blank"
            >
              <img src="/social/instagram.svg" alt="instagram" width={24} />
            </a>
            <a
              href="https://www.facebook.com/losinorganicosorganizados"
              target="_blank"
            >
              <img src="/social/facebook.svg" alt="facebook" width={24} />
            </a>
            <a href="https://www.tiktok.com/@lio_nacional" target="_blank">
              <img src="/social/tiktok.svg" alt="tiktok" width={24} />
            </a>
            <a href="https://twitter.com/Hacemos_Lio" target="_blank">
              <img src="/social/twitter.svg" alt="twitter" width={24} />
            </a>
            <a
              href="https://www.youtube.com/@losinorganicosorganizados4394/"
              target="_blank"
            >
              <img src="/social/youtube.svg" alt="youtube" width={24} />
            </a>
            {/* <a href="https://t.me/lioenpyv" target="_blank">
              <img src="/telegram.svg" alt="telegram" width={24}/>
            </a> */}
          </div>
        </Col>
      </Row>
    </section>
  )
}
