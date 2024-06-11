import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import "@/styles/normalize.css"
import "@/styles/global.scss"
import "@/styles/common.css"
// import "@radix-ui/themes/layout.css"

import classNames from "classnames"
import React from "react"
import LenisScroll from "@/components/LenisScroll"
import IpDetector from "@/components/IpDetector"
import { wix, inter } from "@/fonts"

// ----------------- ROOT LAYOUT -----------------------

export const metadata = {
  title: "LIO",
  description: "Los Inorgánicos Organizados",
  icons: {
    icon: "/favicon.png",
  },
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
        <Theme
          accentColor="sky"
          panelBackground="solid"
          radius="large"
          scaling="105%"
        >
          {children}
        </Theme>
      </body>
      {/* <LenisScroll /> */}
      {/* <IpDetector /> */}
    </html>
  )
}
