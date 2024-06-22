import BlogContent from "@/components/blogTemplate"
const URL = process.env.NEXT_PUBLIC_API_URL
const PATH = "posts"

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
    console.error("❌ actions.ts ~ CATCH error", "\n ❌", error)
  }
}
// SEO
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
