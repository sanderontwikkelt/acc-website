import type { ActionEnum, EntityEnum } from "types/permissions";

import type { Permission } from "@acme/db";
import { auth } from "@acme/auth";

export const getUserServer = async () => {
  const session = await auth();
  return session?.user;
};

export const getPermissionsServer = async (...permissions: Permission[]) => {
  const session = await auth();

  return permissions.map(({ entity, action }) =>
    session?.user.permissions?.some(
      (p) => p.entity === entity && p.action === action,
    ),
  );
};

export const getPermissions = async (
  ...permissions: [entity: EntityEnum, action: ActionEnum][]
): Promise<boolean[]> => {
  const session = await auth();
  if (!session?.user) return permissions.map(() => false);

  return permissions.map(
    ([entity, action]) =>
      !!(
        session.user.permissions?.some(
          (p) =>
            [entity, "all"].includes(p.entity) &&
            [action, "all"].includes(p.action),
        ) || false
      ),
  );
};
