'use client'

import React from 'react'
import styles from './sidebar.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import useMediaQuery from '@/app/hooks/useMediaQuery'
import { sendGTMEvent } from '@next/third-parties/google'
const menu = [
  { ico: 'inicio', label: 'Inicio', href: '/inicio' },
  { ico: 'eventos', label: 'Eventos', href: '/eventos' },
  { ico: 'noticias', label: 'Noticias', href: '/noticias' },
  { ico: 'recursos', label: 'Recursos', href: '/recursos' },
  { ico: 'tienda', label: 'Tienda', href: '/tienda' }
]

const menu2: any[] = [
  // { label: "Juventud", href: "/" },
  // { label: "Ágrafos", href: "/" },
  // { label: "Femenina", href: "/" },
  // { label: "Técnicos y profesionales", href: "/" },
  // { label: "Comunicación", href: "/" },
  // { label: "Desarrollo", href: "/" },
]
interface props {
  className?: string
}
export default function Sidebar({ className }: props) {
  const path = usePathname()
  const currentPath = `/${path.split('/')[1]}`
  const mobile = useMediaQuery('(max-width: 1023px)')
  // console.log(mobile)
  // console.log(path)

  return (
    <>
      {/* ------------------------------------------
       *           MOBILE VERSION
      ------------------------------------------ */}
      <div className={styles.mobileButtons}>
        <nav className={classNames(styles.nav)}>
          {menu.map((item, index) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={styles.link}
                data-active={currentPath === item.href}
              >
                <img src={`/ico/ico-${item.ico}.svg`} alt="" />
              </Link>
            )
          })}
          {/* <a
            onClick={() =>
              sendGTMEvent({ event: 'whatsapp mobile', value: 'click' })
            }
            className={styles.link}
            href="https://chat.whatsapp.com/FhOhNQHdUvMFRx4r8GML0w?text=Hola"
            target="_blank"
          >
            <img src="/social/whatsapp.svg" alt="whatsapp" />
          </a> */}
        </nav>
      </div>
      {/* -----------------------------------------
      *           DESKTOP VERSION
      ----------------------------------------- */}
      <div className={classNames(styles.sidebar, className)}>
        {/* NAV 1 */}
        <div className={styles.navs}>
          <nav className={classNames(styles.nav, styles.mainNav)}>
            {menu.map((item, index) => {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.link}
                  data-active={currentPath === item.href}
                >
                  <img src={`/ico/ico-${item.ico}.svg`} alt="" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          {/* NAV 2 */}
          {menu2.length > 0 && (
            <div className={classNames(styles.nav, styles.grupos)}>
              <span className={styles.title}>Nuestros Grupos</span>
              <ul>
                {menu2.map((item, index) => {
                  return <li key={item.label}>{item.label}</li>
                })}
              </ul>
            </div>
          )}
        </div>
        {/* NAV 3 */}
        <div
          className={classNames(styles.nav, styles.social)}
          aria-label="redes sociales"
        >
          <span className={styles.title}>Seguinos</span>
          <div className={styles.links}>
            <a
              href="https://www.instagram.com/lio_losinorganicosorganizados"
              target="_blank"
            >
              <img src="/social/instagram.svg" alt="instagram" height={22} />
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
    </>
  )
}
