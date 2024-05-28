import BlogContent from "@/components/blogContent"
const URL = process.env.NEXT_PUBLIC_API_URL

//FETCH DATA FROM API
async function getPostById(id: string) {
  const res = await fetch(`${URL}/api/posts/${id}`, {
    method: "GET",
  })
  return res.json()
}
// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  return {
    title: data.data?.attributes?.title,
    description: data.data?.attributes?.description,
    openGraph: [data.data?.attributes?.image],
  }
}
// PAGE
export default async function Recursos({ params }: any) {
  async function getPostById(id: string) {
    const res = await fetch(`${URL}/api/docs/${id}`, {
      method: "GET",
    })
    return res.json()
  }
  const data = await getPostById(params.id)

  return (
    <section>
      <h1>recursos</h1>
      <BlogContent data={data} />
    </section>
  )
}
