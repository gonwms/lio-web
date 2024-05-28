import React from "react"
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"
import styles from "./Footer.module.scss"

const BlogContent = ({ data }: any) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const miniatura = data.data?.attributes?.miniatura?.data?.attributes

  return (
    <>
      {/* {JSON.stringify(post)} */}
      <em>blogpost component</em>
      {data.data && (
        <>
          {miniatura && (
            <picture>
              <source
                media="(max-width <= 600px)"
                srcSet={API_URL + miniatura?.formats.md_avif.url}
                type="image/avif"
              />
              <source
                media="(min-width < 600px)"
                srcSet={API_URL + miniatura?.formats.sm_avif.url}
                type="image/avif"
              />
              <img
                src={API_URL + miniatura?.formats.original_avif.url}
                alt={miniatura?.alternativeText}
              />
            </picture>
          )}
          <h1>{data.data.attributes?.title}</h1>
          <BlocksRenderer content={data.data?.attributes?.content} />
        </>
      )}
    </>
  )
}

export default BlogContent
