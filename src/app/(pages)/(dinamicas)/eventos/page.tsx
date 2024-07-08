import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

// SEO
export async function generateMetadata({ params }: any) {
  return {
    title: "Eventos - LIO",
    description: "novedades",
    openGraph: {
      title: "Eventos - LIO",
      description: "novedades",
    },
    twitter: {
      title: "Eventos - LIO",
      description: "novedades",
    },
  }
}

export default function Eventos() {
  return (
    <>
      <h1 className={styles.plp}>Eventos</h1>
      <ItemsInfiniteScroll resourceType="events" />
    </>
  )
}
