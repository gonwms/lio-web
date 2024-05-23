// "use client"
import React from "react"
import Sidebar from "@/components/Sidebar"
import { useParams, usePathname } from "next/navigation"
import { Flex } from "@radix-ui/themes"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import styles from "./pages.module.scss"
import useMediaQuery from "../hooks/useMediaQuery"

interface IsProps {
  children: React.ReactNode
  params: any
}
export default function PagesLayout({ children }: IsProps) {
  // const mobile = useMediaQuery("(max-width: 600px)")
  // console.log(mobile)

  return (
    <>
      <Header />
      <div className={styles.pages}>
        <Sidebar />
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  )
}
