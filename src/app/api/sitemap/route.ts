import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch the XML sitemap from Strapi
    const response = await fetch(
      "https://lio-server-production.up.railway.app/api/sitemap/index.xml",
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch the sitemap from Strapi")
    }

    // Get the XML text from the response
    let sitemapXml = await response.text()

    // Remove any XSL references if present
    sitemapXml = sitemapXml.replace(/<\?xml-stylesheet [^>]*\?>/g, "")

    // Return the XML response
    return new NextResponse(sitemapXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("Failed to fetch the sitemap:", error)
    return new NextResponse("Failed to fetch the sitemap", { status: 500 })
  }
}
