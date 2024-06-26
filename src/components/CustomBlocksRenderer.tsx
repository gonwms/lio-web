// "use client"
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
  return (
    <>
      <BlocksRenderer
        content={content}
        // key={id}
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
