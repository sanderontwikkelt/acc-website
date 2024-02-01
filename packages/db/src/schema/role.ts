import { relations } from "drizzle-orm";
import {
  int,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { user } from "./auth";
import { id, varChar } from "../utils";

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
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const roleRelations = relations(role, ({ many }) => ({
  users: many(user),
  permissions: many(rolesToPermissions),
}));

export const rolesToPermissions = mySqlTable("rolesToPermissions", {
  permissionId: int("permission_id").notNull(),
  roleId: int("role_id").notNull(),
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
