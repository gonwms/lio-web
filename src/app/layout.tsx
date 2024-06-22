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
    title: `LIO ~ Los Inorgánicos Organizados`,
    description:
      "Somos LIO, una organización comprometida con los ideales del Movimiento Peronista, enfocada en la justicia social, la igualdad y el bienestar del pueblo argentino. Nos alineamos con el partido político Principios y Valores, bajo la conducción de Guillermo Moreno.",
    icons: { icon: "/favicon.png" },
    keywords:
      "LIO, Los Inorganicos Organizados, Peronismo, Guillermo Moreno, Nydia Lirola, ",

    openGraph: {
      title: `LIO ~ Los Inorgánicos Organizados`,
      description:
        "Somos LIO, una organización comprometida con los ideales del Movimiento Peronista, enfocada en la justicia social, la igualdad y el bienestar del pueblo argentino. Nos alineamos con el partido político Principios y Valores, bajo la conducción de Guillermo Moreno.",
      type: "website",
      url: "https://www.lio.com.ar",
      images: ["https://www.lio.com.ar/cover.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: `LIO ~ Los Inorgánicos Organizados`,
      description:
        "Somos LIO, una organización comprometida con los ideales del Movimiento Peronista, enfocada en la justicia social, la igualdad y el bienestar del pueblo argentino. Nos alineamos con el partido político Principios y Valores, bajo la conducción de Guillermo Moreno.",
      site: "@Hacemos_Lio",
      url: "https://www.lio.com.ar",
      images: "https://www.lio.com.ar/cover.webp",
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
