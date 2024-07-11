"use client"
import React, { useRef, useState } from "react"
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"

import styles from "./blogTemplate.module.scss"

interface props {
  content: BlocksContent
  id: number
}

export default function CustomBlocksRender({ content, id }: props) {
  if (!content) return null

  const sanitazeContent: BlocksContent = []
  content.forEach((block) => {
    if (block.type === "paragraph") {
      const parafragh = block.children[0] as { text: string }
      if (parafragh.text !== "") {
        sanitazeContent.push(block)
      }
    } else {
      sanitazeContent.push(block)
    }
  })
  return (
    <>
      <BlocksRenderer
        content={sanitazeContent}
        // key={id}
        blocks={{
          paragraph: ({ children }: any) => {
            // conver \br to <br>
            const convertedString = children.map((child: any) => {
              let text = child.props.text
              if (child.props.italic === true) text = `<i>${text}</i>`
              if (child.props.bold === true) text = `<strong>${text}</strong>`
              return text?.replace(/([^\\])\n/g, "$1<br>")
            })
            return <p dangerouslySetInnerHTML={{ __html: convertedString }}></p>
          },
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
            const img_md = image?.formats as { md_webp: { url: string } }

            return (
              <>
                <img
                  src={img_md?.md_webp.url}
                  alt={image?.alternativeText || "LIO"}
                />
                <span className={styles.caption}>{image.caption}</span>
              </>
            )
          },
        }}
      />
    </>
  )
}
