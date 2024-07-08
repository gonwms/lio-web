import formatDataType from "@/libs/formatDataType"

export default function seo(data: any) {
  return {
    title: "LIO - " + data?.attributes?.title,
    description: data?.attributes?.subTitle,
    keywords: data?.attributes?.tags,
    author: "LIO",
    robots: "index, follow",
    googlebot: "index, follow",
    openGraph: {
      title: "LIO - " + data?.attributes?.title,
      description: data?.attributes?.subTitle,
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
      title: "LIO - " + data?.attributes?.title,
      description: data?.attributes?.subTitle,
      site: "@Hacemos_Lio",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type).path
      }/${data?.attributes?.slug}`,
      images: data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}
