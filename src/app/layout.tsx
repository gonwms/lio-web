import "@/styles/common.css"
import "@/styles/normalize.css"
import "@/styles/global.scss"

import classNames from "classnames"
import React from "react"
import LenisScroll from "@/components/LenisScroll"
import IpDetector from "@/components/IpDetector"
import { wix, inter } from "@/fonts"
import SEO from "./seo"
import { GoogleAnalytics } from "@next/third-parties/google"
// ----------------- ROOT LAYOUT -----------------------

const URL_WEB = process.env.NEXT_PUBLIC_MIDDLEWARE_URL

export async function metadata() {
  return SEO
}

type props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: props) {
  return (
    <html lang="es" className={classNames(wix.variable, inter.variable)}>
      <GoogleAnalytics gaId="G-XKGVC1CXW2" />
      <body
      // suppressHydrationWarning={true}
      >
        {children}
      </body>
      {/* <LenisScroll /> */}
      {/* <IpDetector /> */}
    </html>
  )
}
