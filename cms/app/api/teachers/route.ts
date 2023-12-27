import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.TEACHER,
      ActionEnum.CREATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { title, name, description, mediaId } = body

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 })
    }

    if (!mediaId) {
      return new NextResponse("MediaId is required", { status: 400 })
    }

    const teacher = await prismadb.teacher.create({
      data: {
        title,
        name,
        description,
        media: {
          connect: {
            id: mediaId,
          },
        },
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[teacher_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.get("ids")

    const teacher = await prismadb.teacher.findMany({
      where: {
        ...(ids && { id: { in: ids.split(",") } }),
      },
      include: {
        media: true,
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[teacher_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
