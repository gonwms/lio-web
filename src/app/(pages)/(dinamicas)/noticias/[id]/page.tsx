import BlogContent from "@/components/blogContent"
const URL = process.env.NEXT_PUBLIC_API_URL

//FETCH DATA FROM API
async function getPostById(id: string) {
  const res = await fetch(`${URL}/api/posts/${id}?populate=deep,2`, {
    method: "GET",
  })
  console.log(res)
  return res.json()
}
// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  return {
    title: data?.data?.attributes?.title,
    description: data?.data?.attributes?.description,
    openGraph: [data?.data?.attributes?.image],
  }
}
// PAGE
export default async function Posts({ params }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      <h1>noticias</h1>
      {data.data && <BlogContent data={data} />}
    </section>
  )
}
