import formatDataType from "@/libs/formatDataType"
import dayjs from "dayjs"

dayjs.locale("es")
const now = dayjs()
import "dayjs/locale/es"
import classNames from "classnames"

export default function seo(data: any) {
  return {
    title: "LIO - " + data?.attributes?.title,
    description: `El ${dayjs(data?.attributes?.event_start).format(
      "dddd MMMM [a las] hh:mma"
    )}hs`,

    keywords: data?.attributes?.tags,
    author: "LIO",
    robots: "index, follow",
    googlebot: "index, follow",
    openGraph: {
      title: data?.attributes?.title,
      description: `El ${dayjs(data?.attributes?.event_start).format(
        "dddd MMMM [a las] hh:mma"
      )}hs`,

      type: "website",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type).path
      }/${data?.attributes?.slug}`,

      images: [
        data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.attributes?.title,
      description: `El ${dayjs(data?.attributes?.event_start).format(
        "dddd MMMM [a las] hh:mma"
      )}hs`,

      site: "@Hacemos_Lio",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type).path
      }/${data?.attributes?.slug}`,
      images: data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}
