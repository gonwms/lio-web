import formatDataType from "@/libs/formatDataType"

export default async function seo(data: any) {
  console.log("METADATA")
  console.log(data)
  return {
    title: data?.attributes?.title + " - LIO, Los Inorgánicos Organizados",
    description:
      data?.attributes?.subTitle + "LIO Los inorgánicos Organizados ",
    keywords: "" + data?.attributes?.tags,
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
    // alternates: {
    //   canonical: `https://www.lio.com.ar/${
    //     formatDataType(data?.attributes?.type)?.path
    //   }/${data?.attributes?.slug}`,
    // },
    openGraph: {
      title: "LIO - " + data?.attributes?.title,
      description: data?.attributes?.subTitle,
      type: "website",
      url: `https://www.lio.com.ar/${
        formatDataType(data?.attributes?.type)?.path
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
        formatDataType(data?.attributes?.type)?.path
      }/${data?.attributes?.slug}`,
      images: data?.attributes?.cover?.data?.attributes?.formats?.xl_webp?.url,
    },
  }
}
