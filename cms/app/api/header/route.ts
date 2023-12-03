import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
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

    const { links, navigation, mediaId } = body

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!links) {
      return new NextResponse('links is required', { status: 400 })
    }
    if (!navigation) {
      return new NextResponse('navigation is required', { status: 400 })
    }

    const firstHeader = await prismadb.header.findFirst()

    if (!firstHeader) {
      return new NextResponse('No header found', { status: 400 })
    }

    const header = await prismadb.header.update({
      where: {
        id: firstHeader.id,
      },
      data: {
        links,
        navigation,
        mediaId: mediaId || undefined,
      },
    })

    return NextResponse.json(header)
  } catch (error) {
    console.log('[HEADER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const header = await prismadb.header.findFirst({
      include: {
        media: true,
      },
    })

    return NextResponse.json(header)
  } catch (error) {
    console.log('[MEDIAS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
