import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  int,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

import { createdAt, nnTSDate, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { cart } from "./cart";
import { order } from "./order";
import { role } from "./role";

export const user = mySqlTable("user", {
  id: varChar("id")
    .primaryKey()
    .default(sql`(uuid())`),
  name: nnVarChar("name").default("Gebruiker"),
  email: nnVarChar("email").default(""),
  roleId: int("role_id"),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varChar("image"),
  anonymous: boolean("anonymous").default(false),
  createdAt,
  updatedAt,
});

export const userRelations = relations(user, ({ many, one }) => ({
  account: many(account),
  role: one(role, { fields: [user.roleId], references: [role.id] }),
  cart: one(cart),
  orders: many(order),
}));

export const account = mySqlTable(
  "account",
  {
    userId: nnVarChar("userId"),
    type: nnVarChar("type").$type<"oauth" | "oidc" | "email">(),
    provider: nnVarChar("provider"),
    providerAccountId: nnVarChar("providerAccountId"),
    refresh_token: varChar("refresh_token"),
    access_token: varChar("access_token"),
    expires_at: int("expires_at"),
    token_type: varChar("token_type"),
    scope: varChar("scope"),
    id_token: text("id_token"),
    session_state: varChar("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessions = mySqlTable(
  "session",
  {
    sessionToken: nnVarChar("sessionToken").primaryKey(),
    userId: nnVarChar("userId"),
    expires: nnTSDate("expires"),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(user, { fields: [sessions.userId], references: [user.id] }),
}));

export const verificationTokens = mySqlTable(
  "verificationToken",
  {
    identifier: nnVarChar("identifier"),
    token: nnVarChar("token"),
    expires: nnTSDate("expires"),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
