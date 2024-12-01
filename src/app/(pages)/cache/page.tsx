'use client'
import React, { useState } from 'react'
import { manualClearCache } from '@/actions'
import styles from './cache.module.scss'
import Link from 'next/link'

export default function Clear({ searchParams }: any) {
  // const clearedPathName = searchParams.get("clearedPathName")
  // console.log("searchParams:", searchParams)
  const baseURL = 'https://www.lio.com/'
  const [valor, setValor] = useState(baseURL)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValor(value)
  }
  return (
    <div>
      <h2>Actualizar cache</h2>
      <p>
        copiá la ruta que querés que se actualize con el formato del ejemplo
      </p>
      <code>https://www.lio.com/recursos/la-marcha-peronista</code>
      <form action={manualClearCache} className={styles.form}>
        <input
          name="name"
          type="url"
          placeholder="https://www.lio.com/recursos/la-marcha-peronista"
          value={valor}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">actualizar</button>
      </form>
      {searchParams?.clearedPathName && (
        <p>
          se actualizó:{' '}
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
