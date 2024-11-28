import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')
interface Props {
  title: string
  subTitle?: string
  tags?: string
  author?: string
  visibility?: string
  type?: string
  cover: any
  event_start?: string
  slug: string
}
export default function seo({ title, subTitle, tags, author, visibility, type, cover, event_start, slug }: Props) {
  // const
  const WEB_NAME = 'LIO, Los Inorgánicos Organizados '
  const TAGS = ' LIO, Los Inorgánicos Organizados, Peronismo, Guillermo Moreno, Nydia Lirola, Principios y Valores, militancia peronista'

  const FECHA = event_start ? `${dayjs(event_start).format('dddd DD [de] MMMM [a las] hh:mma')}, ` : ''
  const TITULO = title === '' ? WEB_NAME : title + ' | ' + WEB_NAME // home debe tener titulo vacio y será LIO, los inorganicos organizados
  const DESCRIPCIÓN = FECHA + (subTitle ?? '') + ' | ' + WEB_NAME
  const VISIBLE = `${visibility === 'Público' ? 'index, follow' : 'noindex, nofollow'}`

  return {
    title: TITULO,
    description: DESCRIPCIÓN,
    keywords: (tags ?? '') + TAGS,
    author: author ?? 'LIO',
    robots: VISIBLE,
    googlebot: VISIBLE,
    alternates: { canonical: slug },
    openGraph: {
      title: TITULO,
      description: DESCRIPCIÓN,
      type: 'website',
      url: slug,
      images: [cover]
    },
    twitter: {
      card: 'summary_large_image',
      title: TITULO,
      description: DESCRIPCIÓN,
      site: '@Hacemos_Lio',
      url: slug,
      images: cover
    }
  }
}
