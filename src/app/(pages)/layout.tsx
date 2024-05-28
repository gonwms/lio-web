import React from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import styles from "./layout.module.scss"

interface IsProps {
  children: React.ReactNode
  params: any
}
export default function PagesLayout({ children }: IsProps) {
  return (
    <>
      <Header />
      <div className={styles.pages}>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  )
}
