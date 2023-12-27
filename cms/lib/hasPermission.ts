import { Permission } from "@prisma/client"

import { ActionEnum, EntityEnum } from "@/types/permissions"

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
