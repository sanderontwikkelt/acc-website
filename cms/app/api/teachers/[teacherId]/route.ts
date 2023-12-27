import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.TEACHER,
      ActionEnum.FIND,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.teacherId) {
      return new NextResponse("Teacher id is required", { status: 400 })
    }

    const teacher = await prismadb.teacher.findUnique({
      where: {
        id: params.teacherId,
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[TEACHER_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.TEACHER,
      ActionEnum.DELETE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.teacherId) {
      return new NextResponse("Teacher id is required", { status: 400 })
    }

    const teacher = await prismadb.teacher.delete({
      where: {
        id: params.teacherId,
      },
    })

    return NextResponse.json(teacher)
  } catch (error) {
    console.log("[TEACHER_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.TEACHER,
      ActionEnum.UPDATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { title, name, description, mediaId } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.teacherId) {
      return new NextResponse("Teacher id is required", { status: 400 })
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

    const teacher = await prismadb.teacher.update({
      where: {
        id: params.teacherId,
      },
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
    console.log("[TEACHER_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
