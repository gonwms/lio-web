import BlogContent from "@/components/blogTemplate"
const URL = process.env.NEXT_PUBLIC_API_URL

//FETCH DATA FROM API
async function getPostById(id: string) {
  const res = await fetch(`${URL}/api/products/${id}`, {
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
export default async function Tienda({ params }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      <BlogContent data={data.data} />
    </section>
  )
}
