import "@/styles/normalize.css"
import "@radix-ui/themes/styles.css"
import "@/styles/global.scss"
// import "@radix-ui/themes/layout.css"
import { Theme } from "@radix-ui/themes"

import classNames from "classnames"
import React from "react"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import LenisScroll from "@/components/lenisScroll/LenisScroll"
import { bree, inter } from "@/fonts"
import { Resend } from "resend"

// ----------------- ROOT LAYOUT -----------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //------------------------------------------------------------------------------
  // resend domain verification
  //------------------------------------------------------------------------------
  const resend = new Resend("re_123456789")
  resend.domains.create({ name: "perci.ar" })
  resend.domains.verify("re_4qvPr14D_EzvNtXhVCMAmCy3ySUcRSMwL")

  //
  return (
    <html lang="es" className={classNames(bree.variable, inter.variable)}>
      <body
      // suppressHydrationWarning={true}
      >
        <Theme>
          <Header />

          <main>{children}</main>

          <Footer />
        </Theme>
      </body>

      <LenisScroll />
    </html>
  )
}
