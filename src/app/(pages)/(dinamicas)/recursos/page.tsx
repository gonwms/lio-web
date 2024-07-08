import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

// SEO
export async function generateMetadata({ params }: any) {
  return {
    title: "Recursos - LIO",
    description: "novedades",
    openGraph: {
      title: "Recursos - LIO",
      description: "novedades",
    },
    twitter: {
      title: "Recursos - LIO",
      description: "novedades",
    },
  }
}
export default function Recursos() {
  return (
    <>
      <h1 className={styles.plp}>Recursos</h1>
      <ItemsInfiniteScroll resourceType="docs" />
    </>
  )
}
