import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"

const URL = process.env.NEXT_PUBLIC_API_URL

export default async function Posts({ params }: any) {
  async function getPostById(id: string) {
    const res = await fetch(`${URL}/api/posts/${id}`, {
      method: "GET",
    })
    return res.json()
  }
  const data = await getPostById(params.id)

  return (
    <section>
      {data.data && (
        <>
          <h1>{data.data.attributes?.title}</h1>
          <BlocksRenderer content={data.data.attributes?.content} />;
        </>
      )}
    </section>
  )
}
