"use client"
import React, { Suspense, useRef } from "react"
import classNames from "classnames"
import AdmisionForm from "@/components/forms/AdminisionForm"
import { Section } from "@radix-ui/themes"
import { Row } from "@/components/CustomTags"

// import styles from './contact.module.scss'

export default function Contacto() {
  return (
    <>
      <h1>Contacto</h1>
      <Section size="1">
        <Row direction={{ initial: "column", sm: "column" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdmisionForm />
          </Suspense>
        </Row>
      </Section>
    </>
  )
}
