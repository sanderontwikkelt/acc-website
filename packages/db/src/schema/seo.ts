import { relations } from "drizzle-orm";
import { index, text } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { page } from "./page";

export const seo = mySqlTable(
  "seo",
  {
    id,
    pageId: nnInt("pageId"),
    title: varChar("title"),
    description: text("description"),
    keywords: varChar("keywords"),
    ogTitle: varChar("ogTitle"),
    ogDescription: varChar("ogDescription"),
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
export const seoRelations = relations(seo, ({ one }) => ({
  page: one(page, { fields: [seo.pageId], references: [page.id] }),
  media: one(media, { fields: [seo.mediaId], references: [media.id] }),
}));
