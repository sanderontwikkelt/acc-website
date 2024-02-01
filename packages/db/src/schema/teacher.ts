import { relations } from "drizzle-orm";
import { index, text } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { course } from "./course";
import { media } from "./media";

export const teacher = mySqlTable(
  "teacher",
  {
    id,
    title: varChar("title"),
    name: varChar("name"),
    description: text("description"),
    mediaId: nnInt("mediaId"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
    };
  },
);

export const teacherRelations = relations(teacher, ({ one, many }) => ({
  media: one(media, { fields: [teacher.mediaId], references: [media.id] }),
  courses: many(course),
}));
