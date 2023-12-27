import { NextRequest, NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import { prefixPathname } from "@/lib/prefixPathname"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function POST(req: NextRequest) {
  try {
    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const [allowed] = await getPermissions([
      EntityEnum.MEDIA,
      ActionEnum.CREATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { name, pathname, concept } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!pathname) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const page = await prismadb.page.create({
      data: {
        name,
        pathname: prefixPathname(pathname),
        blocks: "[]",
        createdBy: user.id,
        updatedBy: user.id,
        concept,
        seo: {
          create: {
            title: `${name} - Physis`,
          },
        },
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.log("[PAGES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const pathname = searchParams.get("pathname")
    const mode = searchParams.get("mode")

    const pages = await prismadb.page.findMany({
      where: {
        ...(mode !== "builder" && { concept: false }),
        ...(pathname && { pathname: prefixPathname(pathname) }),
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.log("[PAGES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
