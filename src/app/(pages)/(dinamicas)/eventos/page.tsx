"use client"
import React, { Suspense, useRef } from "react"
import classNames from "classnames"
import AdmisionForm from "@/components/forms/AdminisionForm"
import { Section } from "@radix-ui/themes"
import { Row } from "@/components/CustomTags"
import InfiniteScroll from "@/components/InfiniteScroll"
import SkeletonGrid from "@/components/SkeletonGrid"

// import styles from './contact.module.scss'
export const dynamic = "force-dynamic"
export default function Eventos() {
  return (
    <>
      <h1>Eventos</h1>

      <Suspense fallback={<SkeletonGrid />}>
        <InfiniteScroll resourceType="events" />
      </Suspense>
    </>
  )
}
