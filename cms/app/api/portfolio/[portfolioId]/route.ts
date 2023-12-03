import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.PORTFOLIO,
      ActionEnum.FIND,
    ])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.portfolioId) {
      return new NextResponse('Portfolio id is required', { status: 400 })
    }

    const portfolio = await prismadb.portfolio.findUnique({
      where: {
        id: params.portfolioId,
      },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.log('[PORTFOLIO_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.PORTFOLIO,
      ActionEnum.DELETE,
    ])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.portfolioId) {
      return new NextResponse('Portfolio id is required', { status: 400 })
    }

    const portfolio = await prismadb.portfolio.delete({
      where: {
        id: params.portfolioId,
      },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.log('[PORTFOLIO_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const [allowed] = await getPermissions([
      EntityEnum.PORTFOLIO,
      ActionEnum.UPDATE,
    ])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const body = await req.json()

    const { title, categoryId, description, mediaId } = body

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.portfolioId) {
      return new NextResponse('Portfolio id is required', { status: 400 })
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

    const portfolio = await prismadb.portfolio.update({
      where: {
        id: params.portfolioId,
      },
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
    console.log('[PORTFOLIO_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
