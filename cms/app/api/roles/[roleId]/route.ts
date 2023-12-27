import { NextResponse } from "next/server"

import { ActionEnum, EntityEnum } from "@/types/permissions"
import prismadb from "@/lib/prismadb"
import { getPermissions, getUserServer } from "@/lib/user"

export async function GET(
  req: Request,
  { params }: { params: { roleId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.ROLE, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.roleId) {
      return new NextResponse("Role id is required", { status: 400 })
    }

    const role = await prismadb.role.findUnique({
      where: {
        id: params.roleId,
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.log("[ROLE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { roleId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.ROLE, ActionEnum.DELETE])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.roleId) {
      return new NextResponse("Role id is required", { status: 400 })
    }

    const role = await prismadb.role.delete({
      where: {
        id: params.roleId,
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.log("[ROLE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { roleId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.ROLE, ActionEnum.UPDATE])

    if (!allowed) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const body = await req.json()

    const { name, description, permissionIds } = body

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.roleId) {
      return new NextResponse("Role id is required", { status: 400 })
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

    const currentRole = await prismadb.role.findUnique({
      where: { id: params.roleId },
      include: { permissions: true },
    })

    const permissionsToDisconnect = currentRole?.permissions
      .filter((p) => !permissionIds.includes(p.id))
      .map((p) => ({ id: p.id }))

    const permissionsToConnect = permissionIds
      .filter((id) => !currentRole?.permissions.some((p) => p.id === id))
      .map((id) => ({ id }))

    const role = await prismadb.role.update({
      where: {
        id: params.roleId,
      },
      data: {
        name,
        description,
        permissions: {
          disconnect: permissionsToDisconnect,
          connect: permissionsToConnect,
        },
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.log("[ROLE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
