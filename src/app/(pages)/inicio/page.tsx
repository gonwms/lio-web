// import "server-only"
// "use client"

import React, { Suspense } from 'react'
import classNames from 'classnames'
import styles from './home.module.scss'
import { Col, Row } from '@/components/CustomTags'
import Featured from '@/components/ItemsFeatured'
import ItemsList from '@/components/ItemsList'
import { SkeletonGrid } from '@/components/Skeleton'
import QuickLinksCards from '@/components/QuickLinksCards'

// ---------------------
// types
// ---------------------
interface propsType {
  params: any
  searchParams: any
}

const revalidate = 3600

export default async function Home({ params, searchParams }: propsType) {
  //

  return (
    <>
      <section>
        <Row className={classNames(styles.row)}>
          <Col className={classNames(styles.col)}>
            <h1 className={styles.h1}>
              LIO <span>Los Inorgánicos Organizados</span>
            </h1>
          </Col>
        </Row>
      </section>
      {/* ----------------------------- HERO BANNER---------------------*/}
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
      {/* ----------------------------- Cards --------------------- */}
      <section>
        <Row>
          <>
            <QuickLinksCards />
          </>
        </Row>
      </section>
      {/* ----------------------------- Highlights --------------------- */}

      <section>
        <Row>
          <Featured />
        </Row>
      </section>

      {/* ----------------------------- Grid --------------------- */}

      <section>
        <Row>
          <Suspense fallback={<SkeletonGrid count={10} />}>
            <ItemsList req={searchParams} />
          </Suspense>
        </Row>
      </section>
    </>
  )
}
