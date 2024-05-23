"use client"

import React, { useState } from "react"
import Link from "next/link"

import styles from "./Header.module.scss"
import { usePathname } from "next/navigation"
import { Flex } from "@radix-ui/themes"
import classNames from "classnames"
import useMediaQuery from "@/app/hooks/useMediaQuery"

const menu = [
  { label: "Quienes somos", href: "/quienes-somos", target: "_self" },
  { label: "En dónde estamos", href: "/en-donde-estamos", target: "_self" },
  { label: "Contacto", href: "/contacto", target: "_self" },
]
interface props {
  className?: string
}
const Header = ({ className }: props) => {
  //
  const mobile = useMediaQuery("(max-width: 1023px)")
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={classNames(styles.header, className)}>
        <div>
          <Link href="/">
            <img
              src="/lio-logo.svg"
              alt="LIO los inorgánicos organizados"
              width={52}
              height={50}
            />
          </Link>
          {mobile === false && (
            <nav>
              {menu.map((rute) => {
                return (
                  <Link
                    style={{
                      fontWeight: pathname === rute.href ? "600" : "400",
                    }}
                    key={rute.href}
                    href={rute.href}
                    target={rute.target}
                  >
                    {rute.label}
                  </Link>
                )
              })}
            </nav>
          )}
          <img
            src="/pyv-logo.svg"
            alt="LIO los inorgánicos organizados"
            width={67}
            height={50}
          />
          {mobile === true && (
            <a
              className={classNames(styles.link, styles.burger)}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img src={`/ico-burger-black.svg`} alt="" />
            </a>
          )}
        </div>
      </header>
      {menuOpen && (
        <div className={styles.menu}>
          <nav>
            {menu.map((rute) => {
              return (
                <Link
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontWeight: pathname === rute.href ? "600" : "400",
                  }}
                  key={rute.href}
                  href={rute.href}
                  target={rute.target}
                >
                  {rute.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}

export default Header
