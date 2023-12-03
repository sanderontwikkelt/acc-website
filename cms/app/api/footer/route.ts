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

    const { title, navigation, links, informationLinks, socials } = body

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!title) {
      return new NextResponse('Title is required', { status: 400 })
    }

    if (!navigation) {
      return new NextResponse('Navigation links are required', { status: 400 })
    }

    if (!informationLinks) {
      return new NextResponse('Information links are required', { status: 400 })
    }

    if (!links) {
      return new NextResponse('Links are required', { status: 400 })
    }

    if (!socials) {
      return new NextResponse('Social links are required', { status: 400 })
    }

    const firstFooter = await prismadb.footer.findFirst()

    if (!firstFooter) {
      return new NextResponse('No footer found', { status: 400 })
    }

    const footer = await prismadb.footer.update({
      where: {
        id: firstFooter.id,
      },
      data: {
        title,
        navigation,
        links,
        informationLinks,
        socials,
      },
    })

    return NextResponse.json(footer)
  } catch (error) {
    console.log('[FOOTER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const footer = await prismadb.footer.findFirst()

    return NextResponse.json(footer)
  } catch (error) {
    console.log('[MEDIAS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
