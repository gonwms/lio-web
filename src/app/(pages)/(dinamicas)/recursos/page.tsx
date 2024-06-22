import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

const revalidate = 3600
export default function Recursos() {
  return (
    <>
      <h1 className={styles.plp}>Recursos</h1>
      <ItemsInfiniteScroll resourceType="docs" />
    </>
  )
}
