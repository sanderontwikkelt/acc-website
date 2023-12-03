import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([EntityEnum.USER, ActionEnum.CREATE])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { name, email, password, roleIds } = body

    if (!authUser) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    if (!email) {
      return new NextResponse('Email is required', { status: 400 })
    }

    if (!password) {
      return new NextResponse('Password is required', { status: 400 })
    }

    if (!roleIds || !Array.isArray(roleIds)) {
      return new NextResponse('Role IDs are required', { status: 400 })
    }

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        roles: {
          connect: roleIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[USERS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const [allowed] = await getPermissions([EntityEnum.USER, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const users = await prismadb.user.findMany()

    return NextResponse.json(users)
  } catch (error) {
    console.log('[USERS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
