import formatDataType from "@/libs/formatDataType"
import dayjs from "dayjs"

dayjs.locale("es")
import "dayjs/locale/es"

export default function seo(data: any) {
  return {
    title: "LIO - " + data?.attributes?.title,
    description: `El ${dayjs(data?.attributes?.event_start).format(
      "dddd MMMM [a las] hh:mma"
    )}`,

    keywords: data?.attributes?.tags,
    author: "LIO",
    robots: `${
      data.attributes.visibility === "Público"
        ? "index, follow"
        : "noindex, nofollow"
    }`,
    googlebot: `${
      data.attributes.visibility === "Público"
        ? "index, follow"
        : "noindex, nofollow"
    }`,
    canonical: `https://www.lio.com.ar/${
      formatDataType(data?.attributes?.type).path
    }/${data?.attributes?.slug}`,
    openGraph: {
      title: data?.attributes?.title,
      description: `El ${dayjs(data?.attributes?.event_start).format(
        "dddd MMMM [a las] hh:mma"
      )}`,

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
      )}`,

      site: "@Hacemos_Lio",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type).path
      }/${data?.attributes?.slug}`,
      images: data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}
