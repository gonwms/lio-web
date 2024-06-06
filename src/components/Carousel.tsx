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
  const settingsDefault: Settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...settings,
  }

  return (
    // <div className={`slider-container ${className}`} style={style}>
    <Slider {...settingsDefault} className={`slider-container ${className}`}>
      {children}
    </Slider>
    // </div>
  )
}

function NextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z"></path>
      </svg>
    </div>
  )
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div className={className} onClick={onClick}>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M9.209 5.207 16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z"></path>
      </svg>
    </div>
  )
}

export type { Settings }
