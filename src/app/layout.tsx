import "@/styles/common.css"
import "@/styles/normalize.css"
import "@/styles/global.scss"

import classNames from "classnames"
import React from "react"
import LenisScroll from "@/components/LenisScroll"
import IpDetector from "@/components/IpDetector"
import { wix, inter } from "@/fonts"

// ----------------- ROOT LAYOUT -----------------------

const URL_WEB = process.env.NEXT_PUBLIC_MIDDLEWARE_URL

export async function metadata() {
  return {
    robots: "index, follow",
    googlebot: "index, follow",
    author: "LIO",
    title: `LIO`,
    description: "Movimiento peronistaA",
    icons: { icon: "/favicon.png" },
    keywords:
      "LIO, Los Inorganicos Organizados, Peronismo, Guillermo Moreno, Nydia Lirola, ",

    openGraph: {
      title: "%s LIO",
      description: "Movimiento peronista",
      type: "website",
      url: "https://www.lio.com.ar",
      images: [URL_WEB + "/cover.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: "%s LIO",
      description: "Movimiento peronista",
      site: "@Hacemos_Lio",
      url: "https://www.lio.com.ar",
      images: URL_WEB + "/cover.webp",
    },
  }
}

type props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: props) {
  return (
    <html lang="es" className={classNames(wix.variable, inter.variable)}>
      <body
      // suppressHydrationWarning={true}
      >
        {/* <Theme
          accentColor="sky"
          panelBackground="solid"
          radius="large"
          scaling="105%"
        > */}
        {children}
        {/* </Theme> */}
      </body>
      {/* <LenisScroll /> */}
      {/* <IpDetector /> */}
    </html>
  )
}
