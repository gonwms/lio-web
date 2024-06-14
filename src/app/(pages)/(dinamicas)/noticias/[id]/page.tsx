import BlogContent from "@/components/blogTemplate"
const URL = process.env.NEXT_PUBLIC_API_URL
const PATH = "posts"

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
// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  return {
    title: data?.attributes?.title,
    description: data?.attributes?.description,
    openGraph: [data?.attributes?.image],
  }
}

// PAGE
export default async function Noticias({ params }: any) {
  const data = await getPostById(params.id)

  return (
    data && (
      <section>
        <BlogContent data={data} />
      </section>
    )
  )
}
