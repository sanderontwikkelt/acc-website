import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.CATEGORY,
      ActionEnum.CREATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { title } = body

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    const category = await prismadb.category.create({
      data: {
        title,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[Categories_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.CATEGORY,
      ActionEnum.FIND,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const categories = await prismadb.category.findMany()

    return NextResponse.json(categories)
  } catch (error) {
    console.log("[Categories_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
