import { NextResponse } from "next/server"

import { prefixPathname } from "@/lib/prefixPathname"
import prismadb from "@/lib/prismadb"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const pathname = searchParams.get("pathname")

    const seo = await prismadb.sEO.findFirst({
      where: {
        page: {
          pathname: prefixPathname(pathname || ""),
        },
      },
      include: {
        media: true,
      },
    })

    return NextResponse.json(seo)
  } catch (error) {
    console.log("[SEO_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
