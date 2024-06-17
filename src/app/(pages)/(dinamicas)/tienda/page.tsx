import React from "react"
import ItemsInfiniteScroll from "@/components/ItemInfiniteScroll"
import styles from "../../layout.module.scss"

export const revalidate = 5
// FETCH
async function getPostById(id: string) {
  try {
    const res = await fetch(`${URL}/api/${PATH}/${id}?populate=deep,2`, {
      method: "GET",
    })
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
  }
}
//// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  return {
    title: data?.attributes?.title,
    description: data?.attributes?.subTitle,
    keywords: data?.attributes?.tags,
    author: "LIO",
    robots: "index, follow",
    googlebot: "index, follow",
    openGraph: {
      title: data?.attributes?.title,
      description: data?.attributes?.subTitle,
      type: "website",
      url: "https://www.lio.com.ar",
      // images: `${URL}/uploads/open-graph.jpg`,
      images: [
        URL + data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "LIO | " + data?.attributes?.title,
      description: data?.attributes?.subTitle,
      site: "@Hacemos_Lio",
      url: "https://www.lio.com.ar",
      images:
        URL + data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}

export default function Tienda() {
  return (
    <>
      <h1 className={styles.plp}>Tienda</h1>
      <ItemsInfiniteScroll resourceType="products" />
    </>
  )
}
