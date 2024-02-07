import { relations } from "drizzle-orm";
import { index } from "drizzle-orm/mysql-core";

import { createdAt, id, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { teacher } from "./teacher";

export const course = mySqlTable(
  "course",
  {
    id,
    title: varChar("title"),
    description: varChar("description"),
    mediaId: varChar("media_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const courseRelations = relations(course, ({ one, many }) => ({
  media: one(media, { fields: [course.mediaId], references: [media.id] }),
  teachers: many(teacher),
}));
