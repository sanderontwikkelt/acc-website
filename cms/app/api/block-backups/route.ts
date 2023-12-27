import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions } from "@/lib/user"

export async function GET(req: Request) {
  const [canFind] = await getPermissions([EntityEnum.PAGE, ActionEnum.FIND])

  if (!canFind) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const pageId = searchParams.get("pageId")

    if (!pageId) {
      return new NextResponse("Page id is required", { status: 400 })
    }

    const blockBackup = await prismadb.blockBackup.findMany({
      where: {
        pageId,
      },
    })

    return NextResponse.json(blockBackup)
  } catch (error) {
    console.log("[BLOCKBACKUP_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
