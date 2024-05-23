import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"
import { Metadata } from "next"
// import styles from './contact.module.scss'

const URL = process.env.NEXT_PUBLIC_API_URL

export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  return {
    title: data.data.attributes?.title,
    description: data.data.attributes?.description,
    openGraph: [data.data.attributes?.image],
  }
}
async function getPostById(id: string) {
  const res = await fetch(`${URL}/api/posts/${id}`, {
    method: "GET",
  })
  return res.json()
}
export default async function Posts({ params }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      {data.data && (
        <>
          <h1>{data.data.attributes?.title}</h1>
          --
          <BlocksRenderer content={data.data.attributes?.content} />;
        </>
      )}
    </section>
  )
}
