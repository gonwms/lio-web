"use client"
import React, { useRef } from "react"
import classNames from "classnames"
import AdmisionForm from "@/components/forms/AdminisionForm"
import { Section } from "@radix-ui/themes"
import { Row } from "@/components/CustomTags"
import InfiniteScroll from "@/components/InfiniteScroll"

// import styles from './contact.module.scss'

export default function Tienda() {
  return (
    <>
      <h1>Tienda</h1>
      <InfiniteScroll resourceType="products" />
    </>
  )
}
