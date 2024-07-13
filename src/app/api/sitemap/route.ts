import { NextResponse, NextRequest } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
  // return NextResponse.json("data")
  try {
    const response = await fetch("http://127.0.0.1:1337/api/sitemap/index.xml")
    console.log(response)
    const sitemapXml = await response.text()
    // return NextResponse.json(sitemapXml)
    return new NextResponse(sitemapXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error(error)
    res
  }
}
