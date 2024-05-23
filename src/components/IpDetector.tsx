"use client"
import React, { useEffect } from "react"
import { useStore } from "@/store"
import { encrypt } from "@/libs/encrypt"

const IpDetector = () => {
  const { setUserData, userData } = useStore()

  useEffect(() => {
    if (userData !== null) return
    async function getgeodata() {
      try {
        const res = await fetch("https://freeipapi.com/api/json")
        const data = await res.json()
        setUserData({ ...data, ipAddressSecured: encrypt(data.ipAddress) })
        // console.log(data)
      } catch (error) {
        console.error("Error fetching IP address:", error)
      }
    }
    getgeodata()
  }, [])
  return <></>
}

export default IpDetector
