import BlogContent, { revalidate } from '@/components/blogTemplate'
// import seo from "../seoEventos"
import seo from '../../seoDinamicas'
import formatDataType from '@/libs/formatDataType'
import styles from '../../../layout.module.scss'
const URL = process.env.NEXT_PUBLIC_API_URL
const PATH = 'events'

//FETCH
async function getPostById(id: string) {
  try {
    const res = await fetch(`${URL}/api/${PATH}/${id}?populate=deep,3`, {
      method: 'GET'
    })
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('❌ actions.ts ~ CATCH error', '\n ❌', error)
  }
}

// SEO
export async function generateMetadata({ params }: any) {
  const data = await getPostById(params.id)
  const {
    title,
    subTitle,
    tags,
    author,
    visibility,
    type,
    cover,
    event_start,
    slug
  } = data?.attributes

  return seo({
    title,
    subTitle,
    tags,
    author,
    visibility,
    type,
    cover: cover?.data?.attributes?.formats?.xl_webp?.url,
    event_start,
    slug: `https://www.lio.com.ar/${formatDataType(type)?.path}/${slug}`
  })
}

// PAGE
export default async function Eventos({ params, searchParams }: any) {
  const data = await getPostById(params.id)

  return (
    <section>
      <h1 className={styles.plp}>
        LIO <span>Eventos</span>
      </h1>
      <BlogContent data={data} />
    </section>
  )
}
