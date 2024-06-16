import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"
export default function Noticias() {
  return (
    <>
      <h1 className={styles.plp}>Noticias</h1>
      <ItemsInfiniteScroll resourceType="posts" />
    </>
  )
}
