"use client"
import React, { useEffect } from "react"

import { useStore } from "@/store"
import { encrypt } from "@/libs/encrypt"
// ----------------- CLIENT LAYOUT -----------------------

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ---- STORE
  const { setUserData } = useStore()

  useEffect(() => {
    async function getgeodata() {
      try {
        const res = await fetch("https://freeipapi.com/api/json")
        const data = await res.json()
        setUserData({ ...data, ipAddressSecured: encrypt(data.ipAddress) })
      } catch (error) {
        console.error("Error fetching IP address:", error)
      }
    }
    getgeodata()
  }, [])

  return <>{children}</>
}
