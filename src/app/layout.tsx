import "@/styles/normalize.css"
import "@/styles/global.scss"
import classNames from "classnames"
import React from "react"

import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import LenisScroll from "@/components/lenisScroll/LenisScroll"
import { bree, inter } from "@/fonts"
// ----------------- ROOT LAYOUT -----------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={classNames(bree.variable, inter.variable)}>
      <body
      // suppressHydrationWarning={true}
      >
        <Header />

        <main>{children}</main>

        <Footer />
        {/* <div style={{ height: '100vh', width: '100vw', display: 'grid', placeItems: 'center' }}>
          <h1>redterapia</h1>
        </div> */}
      </body>

      <LenisScroll />
    </html>
  )
}
