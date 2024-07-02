import formatDataType from "@/libs/formatDataType"
import { formatEventDay } from "@/libs/formateDate"

export default function seo(data: any) {
  return {
    title: data?.attributes?.title + " ~ LIO",
    description:
      formatEventDay(data.attributes.event_start).day +
      " " +
      formatEventDay(data.attributes.event_start).hour +
      "hs",
    keywords: data?.attributes?.tags,
    author: "LIO",
    robots: "index, follow",
    googlebot: "index, follow",
    openGraph: {
      title: "LIO ~ " + data?.attributes?.title,
      description:
        formatEventDay(data.attributes.event_start).day +
        " " +
        formatEventDay(data.attributes.event_start).hour +
        "hs",
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
      title: "LIO ~ " + data?.attributes?.title,
      description:
        formatEventDay(data.attributes.event_start).day +
        " " +
        formatEventDay(data.attributes.event_start).hour +
        "hs",
      site: "@Hacemos_Lio",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type).path
      }/${data?.attributes?.slug}`,
      images: data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}
