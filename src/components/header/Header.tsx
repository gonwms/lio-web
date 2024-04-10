'use client'

import React from 'react'
import Link from 'next/link'

import styles from './header.module.scss'

import useMediaQuery from '@/hooks/useMediaQuery'

const Header = () => {
  //
  // const isMobile = useMediaQuery('(width < 500px)')

  const rutes: { name: string; href: string; target?: string }[] = [
    { name: 'inicio', href: '/', target: '_self' },
    { name: 'test', href: '/test', target: '_self' },
    { name: 'blog', href: '/blog/crud', target: '_self' },
    { name: 'politica de cookies', href: '/politica-de-cookies', target: '_self' },
    { name: 'politica de privacidad', href: '/politica-de-privacidad', target: '_self' },
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
