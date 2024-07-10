import React from "react"
import { clearCache } from "@/actions"
import styles from "./cache.module.scss"
export default function Clear() {
  const style = { display: "flex", alignItems: "center", gap: "1rem" }
  return (
    <div>
      <h2>Actualizar cache</h2>
      <p>copiá la ruta que querés que se actualize</p>
      <form action={clearCache} className={styles.form}>
        <input
          name="name"
          type="text"
          placeholder="/recursos/la-marcha-peronista"
        />
        <button type="submit">actualizar</button>
      </form>
    </div>
  )
}
