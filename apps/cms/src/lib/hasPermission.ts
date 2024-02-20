/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { ActionEnum, EntityEnum } from "types/permissions";

import type { Permission } from "@acme/db";

export const hasPermission = async (
  permissions: Permission[],
  requiredEntity: EntityEnum,
  requiredAction: ActionEnum,
): Promise<boolean> => {
  return (
    permissions.some(
      (permission) =>
        permission.entity === requiredEntity &&
        permission.action === requiredAction,
    ) || false
  );
};
