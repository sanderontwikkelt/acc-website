import { authOptions } from './auth'
import { ActionEnum, EntityEnum } from '@/types/permissions'
import { Permission } from '@prisma/client'
import { getServerSession } from 'next-auth'

export const getUserServer = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}

export const getPermissionsServer = async (...permissions: Permission[]) => {
  const session = await getServerSession(authOptions)

  return permissions.map(({ entity, action }) =>
    session?.user.permissions.some(
      (p) => p.entity === entity && p.action === action
    )
  )
}

export const getPermissions = async (
  ...permissions: [entity: EntityEnum, action: ActionEnum][]
) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return permissions.map(() => false)

  return permissions.map(
    ([entity, action]) =>
      session.user.permissions.some(
        (p) => p.entity === entity && p.action === action
      ) || false
  )
}
