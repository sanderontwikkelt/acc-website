import { relations } from "drizzle-orm";
import { index, mysqlEnum } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";
import { media } from "./media";

export const library = mySqlTable(
  "library",
  {
    id,
    slug: varChar("slug"),
    type: mysqlEnum("type", ["PODCAST", "ONLINE_MASTERCLASS", "WHITEPAPER"]),
    title: varChar("title"),
    mediaId: nnInt("media_id"),
    userId: nnInt("user_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
      indx1: index("user_id").on(t.userId),
    };
  },
);

export const libraryRelations = relations(library, ({ one, many }) => ({
  media: one(media, { fields: [library.mediaId], references: [media.id] }),
  user: one(user, { fields: [library.userId], references: [user.id] }),
  relatedLibraries: many(library),
  relatingLibraries: many(library),
}));
