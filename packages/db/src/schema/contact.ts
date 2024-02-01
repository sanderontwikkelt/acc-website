import { relations } from "drizzle-orm";
import {
  index,
  int,
  text,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { file } from "./media";
import { id, varChar, createdAt, updatedAt } from "../utils";

export const contact_email = mySqlTable(
  "contact",
  {
    id,
    firstName: varChar("firstName"),
    lastName: varChar("lastName"),
    phoneNumber: varChar("phoneNumber"),
    email: varChar("email"),
    message: text("message"),
    createdAt,
    updatedAt,
    fileId: int("fileId").notNull(),
  },
  (t) => {
    return {
      indx0: index("fileId").on(t.fileId),
    };
  },
);

export const contact_emailRelations = relations(contact_email, ({ one }) => ({
  file: one(file, { fields: [contact_email.fileId], references: [file.id] }),
}));
