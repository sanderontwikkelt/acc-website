import { prefixPathname } from '@/lib/prefixPathname'
import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.PAGE, ActionEnum.FIND])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.pageId) {
      return new NextResponse('Page id is required', { status: 400 })
    }

    const page = await prismadb.page.findUnique({
      where: {
        id: params.pageId,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.log('[PAGE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.PAGE, ActionEnum.DELETE])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.pageId) {
      return new NextResponse('Page id is required', { status: 400 })
    }

    await prismadb.sEO.deleteMany({
      where: {
        pageId: params.pageId,
      },
    })

    const page = await prismadb.page.delete({
      where: {
        id: params.pageId,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.log('[PAGE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const [allowed] = await getPermissions([EntityEnum.PAGE, ActionEnum.UPDATE])

    if (!allowed) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const user = await getUserServer()

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    const body = await req.json()

    const { name, blocks, concept, pathname } = body

    if (!params.pageId) {
      return new NextResponse('Page id is required', { status: 400 })
    }

    const data = {} as {
      name?: string
      blocks?: any
      concept?: boolean
      pathname?: string
    }

    if (name) {
      data.name = name
    }

    if (pathname) {
      data.pathname = prefixPathname(pathname)
    }

    if (concept !== undefined) {
      data.concept = concept
    }

    if (blocks) {
      data.blocks = blocks
      await prismadb.blockBackup.create({
        data: {
          blocks: blocks,
          page: {
            connect: {
              id: params.pageId,
            },
          },
        },
      })
    }

    const page = await prismadb.page.update({
      where: {
        id: params.pageId,
      },
      data,
    })

    return NextResponse.json(page)
  } catch (error) {
    console.log('[PAGE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
