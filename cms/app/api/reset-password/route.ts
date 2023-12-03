import prismadb from '@/lib/prismadb'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, token, password } = body

    if (!email) {
      return new NextResponse('Email is required', { status: 400 })
    }

    if (!token) {
      return new NextResponse('Token is required', { status: 400 })
    }

    if (!password) {
      return new NextResponse('Password is required', { status: 400 })
    }

    const record = await prismadb.verificationToken.findFirst({
      where: {
        identifier: email,
        token,
      },
    })

    if (!record) {
      return new NextResponse('NOT FOUND', { status: 400 })
    }
    const { expires } = record

    prismadb.verificationToken.delete({
      where: {
        id: record.id,
      },
    })

    if (expires < new Date()) {
      return new NextResponse('EXPIRED', { status: 400 })
    }
    const user = await prismadb.user.update({
      where: {
        email,
      },
      data: {
        password: await bcrypt.hash(password, 10),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[RESET_PASSWORD_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
