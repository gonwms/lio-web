"use client"
import React, { useRef } from "react"
import classNames from "classnames"
import AdmisionForm from "@/components/forms/AdminisionForm"
import { Section } from "@radix-ui/themes"
import { Row } from "@/components/CustomTags"
import InfiniteScroll from "@/components/InfiniteScroll"

export default function Noticias() {
  return (
    <>
      <h1>Noticias</h1>
      <InfiniteScroll resourceType="posts" />
    </>
  )
}
