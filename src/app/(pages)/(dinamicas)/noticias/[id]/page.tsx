import BlogContent from "@/components/blogTemplate"
const URL = process.env.NEXT_PUBLIC_API_URL

//FETCH DATA FROM API
async function getPostById(id: string) {
  try {
    const res = await fetch(`${URL}/api/posts/${id}`, {
      method: "GET",
    })
    return res.json()
  } catch (error) {
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
  }
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
export default async function Noticias({ params }: any) {
  const data = await getPostById(params.id)

  return (
    data && (
      <section>
        <BlogContent data={data.data} />
      </section>
    )
  )
}
