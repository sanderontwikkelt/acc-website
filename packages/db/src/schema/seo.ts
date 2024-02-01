import { relations } from "drizzle-orm";
import {
  index,
  text,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { media } from "./media";
import { page } from "./page";
import { id, nnInt, varChar, createdAt, updatedAt } from "../utils";

export const seo = mySqlTable(
  "SEO",
  {
    id,
    pageId: nnInt("pageId"),
    title: varChar("title"),
    description: text("description"),
    keywords: varChar("keywords"),
    ogTitle: varChar("ogTitle"),
    ogDescription: varChar("ogDescription"),
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
export const seoRelations = relations(seo, ({ one }) => ({
  page: one(page, { fields: [seo.pageId], references: [page.id] }),
  media: one(media, { fields: [seo.mediaId], references: [media.id] }),
}));
