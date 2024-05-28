"use client"

import React, { useState } from "react"
import Link from "next/link"

import styles from "./Header.module.scss"
import { usePathname } from "next/navigation"
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
          {/* MENU DESKTOP VERSION */}
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
              <a
                href="https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w"
                target="_blank"
              >
                <img src="/whatsapp.svg" alt="whatsapp" />
              </a>
            </nav>
          )}
          <img
            src="/pyv-logo.svg"
            alt="LIO los inorgánicos organizados"
            width={67}
            height={50}
          />

          {/* MOBILE BURGER */}
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

      {/* MENU */}
      {menuOpen && (
        <div className={styles.menu} onClick={() => setMenuOpen(false)}>
          <div className={styles.inner}>
            <Link href="/">
              <img
                src="/lio-logo.svg"
                alt="LIO los inorgánicos organizados"
                width={52}
                height={50}
              />
            </Link>
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
              <a
                href="https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w"
                target="_blank"
              >
                <img src="/whatsapp.svg" alt="whatsapp" />
              </a>
            </nav>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/lio_losinorganicosorganizados"
                target="_blank"
              >
                <img src="/instagram.svg" alt="instagram" />
              </a>
              <a
                href="https://www.facebook.com/losinorganicosorganizados"
                target="_blank"
              >
                <img src="/facebook.svg" alt="facebook" />
              </a>
              <a href="https://www.tiktok.com/@lio_nacional" target="_blank">
                <img src="/tiktok.svg" alt="tiktok" />
              </a>
              <a href="https://twitter.com/Hacemos_Lio" target="_blank">
                <img src="/twitter.svg" alt="twitter" />
              </a>
              <a
                href="https://www.youtube.com/@losinorganicosorganizados4394/"
                target="_blank"
              >
                <img src="/youtube.svg" alt="youtube" />
              </a>
              {/* <a href="https://t.me/lioenpyv" target="_blank">
              <img src="/telegram.svg" alt="telegram" />
            </a> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
