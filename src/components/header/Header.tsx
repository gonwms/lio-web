"use client"

import React from "react"
import Link from "next/link"

import styles from "./header.module.scss"

// import useMediaQuery from "@/hooks/useMediaQuery"

const Header = () => {
  //
  // const isMobile = useMediaQuery('(width < 500px)')

  const rutes: { name: string; href: string; target?: string }[] = [
    { name: "inicio", href: "/", target: "_self" },
    { name: "contact", href: "/contact", target: "_self" },
  ]

  return (
    <header className={styles.header}>
      <div>
        {rutes.map((rute) => {
          return (
            <Link key={rute.href} href={rute.href} target={rute.target}>
              {rute.name}
            </Link>
          )
        })}
      </div>
    </header>
  )
}

export default Header
