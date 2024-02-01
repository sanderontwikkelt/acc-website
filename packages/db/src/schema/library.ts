import { relations } from "drizzle-orm";
import {
  index,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { media } from "./media";
import { user } from "./auth";
import { id, nnInt, varChar, createdAt, updatedAt } from "../utils";

export const library = mySqlTable(
  "Library",
  {
    id,
    slug: varChar("slug"),
    type: mysqlEnum('type', ['PODCAST', 'ONLINE_MASTERCLASS', 'WHITEPAPER']),
    title: varChar("title"),
    mediaId: nnInt("mediaId"),
    userId: nnInt("userId"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
      indx1: index("userId").on(t.userId),
    };
  },
);

export const libraryRelations = relations(library, ({ one, many }) => ({
  media: one(media, { fields: [library.mediaId], references: [media.id] }),
  user: one(user, { fields: [library.userId], references: [user.id] }),
  relatedLibraries: many(library),
  relatingLibraries: many(library),
}));
