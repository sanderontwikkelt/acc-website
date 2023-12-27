import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([EntityEnum.ROLE, ActionEnum.CREATE])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { name, description, permissionIds } = body

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 })
    }

    if (!permissionIds || !Array.isArray(permissionIds)) {
      return new NextResponse("Permission IDs are required", { status: 400 })
    }

    const role = await prismadb.role.create({
      data: {
        name,
        description,
        permissions: {
          connect: permissionIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.log("[ROLES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const [allowed] = await getPermissions([EntityEnum.ROLE, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const roles = await prismadb.role.findMany()

    return NextResponse.json(roles)
  } catch (error) {
    console.log("[ROLES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
