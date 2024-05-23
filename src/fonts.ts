import { Inter, Wix_Madefor_Display } from "next/font/google"

export const wix = Wix_Madefor_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-wix",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})
