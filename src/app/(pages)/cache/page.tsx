import React from "react"
import { manualClearCache } from "@/actions"
import styles from "./cache.module.scss"
import Link from "next/link"

export default function Clear({ searchParams }: any) {
  // const clearedPathName = searchParams.get("clearedPathName")
  // console.log("searchParams:", searchParams)

  return (
    <div>
      <h2>Actualizar cache</h2>
      <p>
        copiá la ruta que querés que se actualize con el formato del ejemplo
      </p>
      <form action={manualClearCache} className={styles.form}>
        <input
          name="name"
          type="url"
          placeholder="https://www.lio.com/recursos/la-marcha-peronista"
        />
        <button type="submit">actualizar</button>
      </form>
      {searchParams?.clearedPathName && (
        <p>
          se actualizó:{" "}
          <Link
            rel="stylesheet"
            href={searchParams?.clearedPathName}
            target="_blank"
          >
            {searchParams?.clearedPathName}
          </Link>
        </p>
      )}
    </div>
  )
}
