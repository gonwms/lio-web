'use client'

import React, { useState } from 'react'
import Link from 'next/link'

import styles from './header.module.scss'

import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import useMediaQuery from '@/app/hooks/useMediaQuery'

const menu = [
  { label: 'Inicio', href: '/inicio', target: '_self' }
  // { label: "Quienes somos", href: "/quienes-somos", target: "_self" },
  // { label: "En dónde estamos", href: "/en-donde-estamos", target: "_self" },
  // { label: "Contacto", href: "/contacto", target: "_self" },
]
interface props {
  className?: string
}
const Header = ({ className }: props) => {
  //
  const mobile = useMediaQuery('(max-width: 1023px)')
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={classNames(styles.header, className)}>
        <div>
          <Link href="/" className={styles.logo}>
            <img
              src="/lio-logo.svg"
              alt="LIO los inorgánicos organizados"
              width={52}
              height={50}
            />{' '}
            {/* Los Inorgánicos Organizados */}
          </Link>

          {/* MENU DESKTOP VERSION */}
          <nav>
            {menu.map((rute) => {
              return (
                <Link
                  style={{
                    fontWeight: pathname === rute.href ? '600' : '400'
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
              Contacto{' '}
              <img src="/social/whatsapp.svg" alt="whatsapp" height={20} />
            </a>
          </nav>
          <a href="https://www.principiosyvalores.org/" target="_blank">
            <img
              className={styles.logoPyV}
              src="/pyv-logo.svg"
              alt="LIO los inorgánicos organizados"
              width={67}
              height={50}
            />
          </a>

          {/* MOBILE BURGER */}

          <button
            className={classNames(styles.link, styles.burger)}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src={`/ico/ico-burger-black.svg`} alt="" />
          </button>
        </div>
      </header>

      {/* MENU */}
      {menuOpen && (
        <div className={styles.mobileMenu} onClick={() => setMenuOpen(false)}>
          <div className={styles.inner}>
            <div className={styles.logos}>
              <Link href="/">
                <img
                  src="/lio-logo.svg"
                  alt="LIO los inorgánicos organizados"
                  width={52}
                  height={50}
                />
              </Link>
              <a href="https://www.principiosyvalores.org/" target="_blank">
                <img
                  className={styles.logoPyV}
                  src="/pyv-logo.svg"
                  alt="Principios y Valores"
                  width={67}
                  height={50}
                />
              </a>
            </div>
            <nav>
              {menu.map((rute) => {
                return (
                  <Link
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontWeight: pathname === rute.href ? '600' : '400'
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
                Whatsapp{' '}
                <img src="/social/whatsapp.svg" alt="whatsapp" height={20} />
              </a>
            </nav>
            <div className={styles.social}>
              <span className={styles.title}>Seguinos</span>
              <div>
                <a
                  href="https://www.instagram.com/lio_losinorganicosorganizados"
                  target="_blank"
                >
                  <img
                    src="/social/instagram.svg"
                    alt="instagram"
                    height={22}
                  />
                </a>
                <a
                  href="https://www.facebook.com/losinorganicosorganizados"
                  target="_blank"
                >
                  <img src="/social/facebook.svg" alt="facebook" height={22} />
                </a>
                <a href="https://www.tiktok.com/@lio_nacional" target="_blank">
                  <img src="/social/tiktok.svg" alt="tiktok" height={22} />
                </a>
                <a href="https://twitter.com/Hacemos_Lio" target="_blank">
                  <img src="/social/twitter.svg" alt="twitter" height={22} />
                </a>
                <a
                  href="https://www.youtube.com/@losinorganicosorganizados4394/"
                  target="_blank"
                >
                  <img src="/social/youtube.svg" alt="youtube" height={22} />
                </a>
                {/* <a href="https://t.me/lioenpyv" target="_blank">
              <img src="/telegram.svg" alt="telegram" />
            </a> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
