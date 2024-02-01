import { relations } from "drizzle-orm";
import { unique } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";

export const permission = mySqlTable(
  "permission",
  {
    id,
    type: varChar("type"),
    entity: varChar("entity"),
    action: varChar("action"),
  },
  (t) => {
    return {
      indx0: unique().on(t.entity, t.action),
    };
  },
);

export const permissionRelations = relations(permission, ({ many }) => ({
  roles: many(rolesToPermissions),
}));

export const role = mySqlTable("role", {
  id,
  name: nnVarChar("name"),
  description: varChar("description"),
  createdAt,
  updatedAt,
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
  permissions: many(rolesToPermissions),
}));

export const rolesToPermissions = mySqlTable("rolesToPermissions", {
  permissionId: nnInt("permission_id"),
  roleId: nnInt("role_id"),
});

export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    role: one(role, {
      fields: [rolesToPermissions.roleId],
      references: [role.id],
    }),
    permission: one(permission, {
      fields: [rolesToPermissions.permissionId],
      references: [permission.id],
    }),
  }),
);
