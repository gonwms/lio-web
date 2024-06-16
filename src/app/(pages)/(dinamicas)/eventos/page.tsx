import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"

import styles from "../../layout.module.scss"
// import styles from './contact.module.scss'
export const revalidate = 5
export default function Eventos() {
  return (
    <>
      <h1 className={styles.plp}>Eventos</h1>
      <ItemsInfiniteScroll resourceType="events" />
    </>
  )
}
