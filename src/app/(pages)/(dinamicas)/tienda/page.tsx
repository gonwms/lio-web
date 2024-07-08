import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

// SEO
export async function generateMetadata({ params }: any) {
  return {
    title: "Tienda - LIO",
    description: "novedades",
    openGraph: {
      title: "Tienda - LIO",
      description: "novedades",
    },
    twitter: {
      title: "Tienda - LIO",
      description: "novedades",
    },
  }
}
export default function Tienda() {
  return (
    <>
      <h1 className={styles.plp}>Tienda</h1>
      <ItemsInfiniteScroll resourceType="products" />
    </>
  )
}
