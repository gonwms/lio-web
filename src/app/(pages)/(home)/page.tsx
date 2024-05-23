// import "server-only"

import React, { Suspense } from "react"
import classNames from "classnames"
import styles from "./home.module.scss"
import { Grid } from "@radix-ui/themes"
import { Col, Row } from "@/components/CustomTags"

import Featured from "./Featured"
import ItemListProvider from "@/components/ItemListProvider"
import ItemList from "@/components/ItemList"

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
  return (
    <main className={styles.main}>
      {/*
       *
       * ----------------------------- HERO ---------------------
       *
       */}
      <section>
        <Row>
          <Col className={classNames(styles.col)}>
            <div className={styles.banner}>
              <img src="/lio-1t.svg" alt="" />
              <span>Nydia Lirola</span>
              <img className={styles.foto} src="/guillermo-nydia.webp" alt="" />
              <span>Guillermo Moreno</span>
              <img src="/pyv-1t.svg" alt="" />
            </div>
          </Col>
        </Row>
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
      <section className={styles.grid}>
        <Row>
          <Suspense fallback={<h2>aguntá makina</h2>}>
            <ItemListProvider>
              <ItemList req={searchParams} />
            </ItemListProvider>
          </Suspense>
        </Row>
      </section>
      {/*
       *
       * ----------------------------- OTRA ---------------------
       *
       */}
      {/* <Section>
        <Row className={classNames(styles.row)} align={{ initial: "center" }}>
          <Col
            className={classNames(styles.col, styles.col1)}
            direction={{ initial: "column" }}
          >
            <h2>section 2</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sint
              quos officiis asperiores odio, esse beatae. Adipisci vero deleniti
              ipsa quaerat facilis eveniet soluta dicta voluptates autem!
              Impedit, libero corrupti.
            </p>
          </Col>
          <Col
            className={classNames(styles.col, styles.col2)}
            direction={{ initial: "column" }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sint
              quos officiis asperiores odio, esse beatae. Adipisci vero deleniti
              ipsa quaerat facilis eveniet soluta dicta voluptates autem!
              Impedit, libero corrupti.
            </p>
          </Col>
        </Row>
      </Section> */}
    </main>
    // </Grid>
  )
}
