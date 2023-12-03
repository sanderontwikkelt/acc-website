import { ActionEnum, EntityEnum } from '@/types/permissions'
import { Permission } from '@prisma/client'

export const hasPermission = async (
  permissions: Permission[],
  requiredEntity: EntityEnum,
  requiredAction: ActionEnum
): Promise<boolean> => {
  return (
    permissions.some(
      (permission) =>
        permission.entity === requiredEntity &&
        permission.action === requiredAction
    ) || false
  )
}
