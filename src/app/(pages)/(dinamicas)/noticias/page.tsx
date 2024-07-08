import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

// SEO
export async function generateMetadata({ params }: any) {
  return {
    title: "Noticias - LIO",
    description: "novedades",
    openGraph: {
      title: "Noticias - LIO",
      description: "novedades",
    },
    twitter: {
      title: "Noticias - LIO",
      description: "novedades",
    },
  }
}
export default function Noticias() {
  return (
    <>
      <h1 className={styles.plp}>Noticias</h1>
      <ItemsInfiniteScroll resourceType="posts" />
    </>
  )
}
