import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.USER, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[USER_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.USER, ActionEnum.CREATE])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const authUser = await getUserServer()

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[USER_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.USER, ActionEnum.CREATE])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { name, email, password, roleIds } = body

    if (!authUser) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    if (!roleIds || !Array.isArray(roleIds)) {
      return new NextResponse("Role IDs are required", { status: 400 })
    }

    const currentUser = await prismadb.user.findUnique({
      where: { id: params.userId },
      include: { roles: true },
    })

    const rolesToDisconnect = currentUser?.roles
      .filter((p) => !roleIds.includes(p.id))
      .map((p) => ({ id: p.id }))

    const rolesToConnect = roleIds
      .filter((id) => !currentUser?.roles.some((p) => p.id === id))
      .map((id) => ({ id }))

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        email,
        roles: {
          disconnect: rolesToDisconnect,
          connect: rolesToConnect,
        },
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[USER_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
