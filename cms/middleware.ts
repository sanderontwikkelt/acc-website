import { hasPermission } from './lib/hasPermission'
import { ActionEnum, EntityEnum } from './types/permissions'
import { Permission } from '@prisma/client'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      const permissions = (token?.permissions as Permission[]) || []
      const { pathname } = req.nextUrl
      if (['/footer', '/header'].includes(pathname))
        return hasPermission(permissions, EntityEnum.PAGE, ActionEnum.UPDATE)

      const entity = Object.values(EntityEnum).find((ent) =>
        pathname.includes(ent)
      )

      const action = pathname.includes('/new')
        ? ActionEnum.CREATE
        : pathname.split('/').length <= 2
        ? ActionEnum.FIND
        : ActionEnum.UPDATE

      if (entity) {
        return hasPermission(permissions, entity, action)
      }

      return !!token
    },
  },
})

export const config = {
  matcher: [
    '/',
    '/settings',
    '/header',
    '/footer',
    '/pages',
    '/pages/new',
    '/pages/:path*',
    '/categories',
    '/categories/new',
    '/categories/:path*',
    '/users',
    '/users/new',
    '/users/:path*',
    '/roles',
    '/roles/new',
    '/roles/:path*',
    '/media',
    '/media/new',
    '/media/:path*',
  ],
}
