import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

import { deleteFile } from "../helpers/deleteFile"

export async function GET(
  req: Request,
  { params }: { params: { mediaId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.MEDIA, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.mediaId) {
      return new NextResponse("Media id is required", { status: 400 })
    }

    const media = await prismadb.media.findUnique({
      where: {
        id: params.mediaId,
      },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.log("[MEDIA_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { mediaId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.MEDIA,
      ActionEnum.DELETE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const authMedia = await getUserServer()

    if (!authMedia) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const media = await prismadb.media.findFirst({
      where: {
        id: params.mediaId,
      },
    })

    if (!media) {
      return new NextResponse("No media found", { status: 400 })
    }

    const response = await prismadb.media.delete({
      where: {
        id: params.mediaId,
      },
    })
    await deleteFile(media.filepath)

    return NextResponse.json(response)
  } catch (error) {
    console.log("[MEDIA_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { mediaId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.MEDIA,
      ActionEnum.UPDATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const authMedia = await getUserServer()

    const body = await req.json()

    const { filename } = body

    if (!authMedia) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!filename) {
      return new NextResponse("filename is required", { status: 400 })
    }

    if (!params.mediaId) {
      return new NextResponse("Media id is required", { status: 400 })
    }

    const media = await prismadb.media.update({
      where: {
        id: params.mediaId,
      },
      data: {
        filename,
      },
    })

    return NextResponse.json(media)
  } catch (error) {
    console.log("[MEDIA_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
