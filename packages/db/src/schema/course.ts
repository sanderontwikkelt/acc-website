import { relations } from "drizzle-orm";
import { index } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { media } from "./media";
import { teacher } from "./teacher";
import { id, varChar, updatedAt, createdAt } from "../utils";

export const course = mySqlTable(
  "Course",
  {
    id,
    title: varChar("title"),
    description: varChar("description"),
    mediaId: varChar("mediaId"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
    };
  },
);

export const courseRelations = relations(course, ({ one, many }) => ({
  media: one(media, { fields: [course.mediaId], references: [media.id] }),
  teachers: many(teacher),
}));
