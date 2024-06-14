"use client"
import React from "react"
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"

interface props {
  content: BlocksContent
  key?: string
}
const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function CustomBlocksRender({ content, key }: props) {
  return (
    <BlocksRenderer
      content={content}
      key={key}
      blocks={{
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h3>{children}</h3>
            case 2:
              return <h4>{children}</h4>
            case 3:
              return <h5>{children}</h5>
            case 4:
              return <strong>{children}</strong>
            case 5:
              return <strong>{children}</strong>
            case 6:
              return <strong>{children}</strong>
            default:
              return <strong>{children}</strong>
          }
        },
        // RENDER LINK AS TARGET BLANK
        link: ({ children, url }) => (
          <a href={url} target="_blank">
            {children}
          </a>
        ),
        // RENDER CODE AS HTML
        code: ({ plainText }) => {
          if (plainText) {
            return <div dangerouslySetInnerHTML={{ __html: plainText }}></div>
          }
        },
        image: ({ image }) => {
          console.log(image)
          const formats = image.formats as { md_webp: { url: string } }
          const path = formats.md_webp.url
          return (
            <img src={API_URL + path} alt={image.alternativeText || "LIO"} />
          )
        },
      }}
    />
  )
}
