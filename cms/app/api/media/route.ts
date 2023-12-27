import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

import { uploadFile } from "./helpers/uploadFile"

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.MEDIA,
      ActionEnum.CREATE,
    ])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const authUser = await getUserServer()

    const data = await req.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return new NextResponse("No file", { status: 400 })
    }

    const uploadData = await uploadFile(file)

    if (!uploadData) {
      return new NextResponse("Er is iets mis gegaan with the uploaded file", {
        status: 400,
      })
    }

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const media = await prismadb.media.create({
      data: uploadData,
    })

    return NextResponse.json(media)
  } catch (error) {
    console.log("[MEDIAS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const [allowed] = await getPermissions([EntityEnum.MEDIA, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const filter: Prisma.MediaWhereInput = {
      mimetype: {
        contains: type || undefined, // Check if the 'type' contains the search value
      },
    }

    const medias = await prismadb.media.findMany({
      where: filter,
    })

    return NextResponse.json(medias)
  } catch (error) {
    console.log("[MEDIAS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
