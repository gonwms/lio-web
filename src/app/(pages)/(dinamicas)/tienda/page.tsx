import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

export const revalidate = 5
export default function Tienda() {
  return (
    <>
      <h1 className={styles.plp}>Tienda</h1>
      <ItemsInfiniteScroll resourceType="products" />
    </>
  )
}
