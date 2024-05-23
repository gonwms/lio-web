"use client"
import React from "react"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "@/styles/react-slick.css"
interface IsProps {
  children: React.ReactNode
  settings: Settings
  style?: React.CSSProperties | undefined
  className?: string | undefined
}

export function Carousel({ children, settings, style, className }: IsProps) {
  return (
    // <div className={`slider-container ${className}`} style={style}>
    <Slider {...settings} className={`slider-container ${className}`}>
      {children}
    </Slider>
    // </div>
  )
}

export type { Settings }
