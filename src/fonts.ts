import { Bree_Serif, Inter } from "next/font/google";

export const bree = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bree",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
