import prismadb from '@/lib/prismadb'
import { getPermissions, getUserServer } from '@/lib/user'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { seoId: string } }
) {
  const [allowed] = await getPermissions([EntityEnum.PAGE, ActionEnum.FIND])

  if (!allowed) {
    return new NextResponse('Unauthenticated', { status: 403 })
  }

  try {
    if (!params.seoId) {
      return new NextResponse('Seo id is required', { status: 400 })
    }

    const seo = await prismadb.sEO.findUnique({
      where: {
        id: params.seoId,
      },
    })

    return NextResponse.json(seo)
  } catch (error) {
    console.log('[SEO_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { seoId: string } }
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

    const { title, description, ogTitle, ogDescription, mediaId } = body

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.seoId) {
      return new NextResponse('Seo id is required', { status: 400 })
    }

    const seo = await prismadb.sEO.update({
      where: {
        id: params.seoId,
      },
      data: {
        title,
        description,
        ogTitle,
        ogDescription,
        ...(mediaId && {
          media: {
            connect: {
              id: mediaId,
            },
          },
        }),
      },
    })

    return NextResponse.json(seo)
  } catch (error) {
    console.log('[SEO_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
