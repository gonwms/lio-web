"use client"
import React, { Suspense, useRef } from "react"
import classNames from "classnames"
import AdmisionForm from "@/components/forms/AdminisionForm"
import { Section } from "@radix-ui/themes"
import { Row } from "@/components/CustomTags"

import styles from "./contacto.module.scss"

export default function Contacto() {
  return (
    <>
      <section>
        <Row>
          <h1>Contacto</h1>
          <p>Contacte a nuesto mail completando el siguiete formulario</p>
          <Suspense fallback={<div>Cargando...</div>}>
            <AdmisionForm />
          </Suspense>
        </Row>
        <Row className={classNames(styles.row)}>
          <a
            href="https://www.google.com/maps/place/Comuna+11,+Alejandro+Magari%C3%B1os+Cervantes+2157,+C1416DYQ+Cdad.+Aut%C3%B3noma+de+Buenos+Aires/@-34.6094473,-58.474939,15z/data=!4m6!3m5!1s0x95bcc9fb861aa58b:0x1f6c682f7a06bc81!8m2!3d-34.6084345!4d-58.47087!16s%2Fg%2F11mxb3jwdm?entry=ttu"
            target="_blank"
          >
            Magariños Cervantes 2157, CABA
          </a>
        </Row>
      </section>
    </>
  )
}
