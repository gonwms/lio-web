import BlogContent from "@/components/blogTemplate"
import seo from "../../seoInternas"
const URL = process.env.NEXT_PUBLIC_API_URL
const PATH = "docs"

const revalidate = 3600
// FETCH
async function getPostById(id: string) {
  try {
    const res = await fetch(`${URL}/api/${PATH}/${id}?populate=deep,2`, {
      method: "GET",
    })
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("❌ ~ CATCH error", "\n ❌", error)
  }
}
// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  const seodata = await seo(data)
  return seodata
}

// PAGE
export default async function Recursos({ params }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      <BlogContent data={data} />
    </section>
  )
}
