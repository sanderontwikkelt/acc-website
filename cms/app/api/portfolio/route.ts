import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.PORTFOLIO,
      ActionEnum.CREATE,
    ])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const authUser = await getUserServer()

    const body = await req.json()

    const { title, categoryId, description, mediaId } = body

    if (!authUser) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('CategoryId is required', { status: 400 })
    }

    if (!description) {
      return new NextResponse('Description is required', { status: 400 })
    }

    if (!mediaId) {
      return new NextResponse('MediaId is required', { status: 400 })
    }

    const portfolio = await prismadb.portfolio.create({
      data: {
        title,
        description,
        media: {
          connect: {
            id: mediaId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.log('[portfolio_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.PORTFOLIO,
      ActionEnum.FIND,
    ])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const portfolio = await prismadb.portfolio.findMany()

    return NextResponse.json(portfolio)
  } catch (error) {
    console.log('[portfolio_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
