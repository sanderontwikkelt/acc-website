import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const [allowed] = await getPermissions([EntityEnum.CATEGORY, ActionEnum.FIND])

  if (!allowed) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  try {
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  const [allowed] = await getPermissions([EntityEnum.PAGE, ActionEnum.DELETE])

  if (!allowed) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  try {
    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.CATEGORY,
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

    const { title, mediaId } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!mediaId) {
      return new NextResponse("MediaId is required", { status: 400 })
    }

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        title,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
