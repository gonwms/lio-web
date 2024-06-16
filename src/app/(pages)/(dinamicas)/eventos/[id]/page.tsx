import BlogContent from "@/components/blogTemplate"

const URL = process.env.NEXT_PUBLIC_API_URL
const PATH = "events"

export const revalidate = 5

//FETCH
async function getPostById(id: string) {
  try {
    const res = await fetch(`${URL}/api/${PATH}/${id}?populate=deep,3`, {
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
    title: "LIO | " + data?.attributes?.title,
    description: data?.attributes?.subTitle,
    // keywords: "your, keywords, here",
    author: "LIO",
    robots: "index, follow",
    googlebot: "index, follow",
    openGraph: {
      title: data?.attributes?.title,
      description: data?.attributes?.subTitle,
      type: "website",
      url: "https://www.lio.com.ar",
      image: [data?.attributes?.cover],
    },
    twitter: {
      card: "summary_large_image",
      title: "LIO | " + data?.attributes?.title,
      description: "Your website description goes here.",
      url: "https://www.lio.com.ar",
      image: [data?.attributes?.cover],
    },
  }
}

// PAGE
export default async function Eventos({ params, searchParams }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      <BlogContent data={data} />
    </section>
  )
}
