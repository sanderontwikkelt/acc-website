import { relations } from "drizzle-orm";
import { index, int, json, text } from "drizzle-orm/mysql-core";

import { user } from ".";
import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { seo } from "./seo";

export const header = mySqlTable(
  "header",
  {
    id,
    createdAt,
    updatedAt,
    mediaId: int("media_id"),
    navigation: json("navigation"),
    links: json("links"),
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const headerRelations = relations(header, ({ one }) => ({
  media: one(media, { fields: [header.mediaId], references: [media.id] }),
}));

export const footer = mySqlTable(
  "footer",
  {
    id,
    title: nnVarChar("title"),
    navigation: json("navigation"),
    links: json("links"),
    socials: json("socials"),
    informationLinks: json("informationLinks"),
    mediaId: int("media_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const footerRelations = relations(footer, ({ one }) => ({
  media: one(media, { fields: [footer.mediaId], references: [media.id] }),
}));

export const page = mySqlTable(
  "page",
  {
    id,
    pathname: nnVarChar("pathname"),
    name: nnVarChar("name"),
    concept: int("concept").default(1),
    blocks: json("blocks"),
    createdBy: nnVarChar("createdBy"),
    updatedBy: nnVarChar("updatedBy"),
    seoTitle: varChar("seo-title"),
    seoDescription: text("seo-description"),
    seoMediaId: int("media_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("createdBy").on(t.createdBy),
      indx1: index("updatedBy").on(t.updatedBy),
      indx2: index("media_id").on(t.seoMediaId),
    };
  },
);

export const pageRelations = relations(page, ({ one, many }) => ({
  seo: one(seo),
  media: one(media, { fields: [page.seoMediaId], references: [media.id] }),
  createdBy: one(user, { fields: [page.createdBy], references: [user.id] }),
  updatedBy: one(user, { fields: [page.updatedBy], references: [user.id] }),
  backups: many(block_backup),
}));

export const block_backup = mySqlTable(
  "blockBackup",
  {
    id,
    blocks: json("blocks"),
    pageId: nnInt("page_id"),
    createdAt,
    createdBy: nnVarChar("createdBy"),
  },
  (t) => {
    return {
      indx0: index("page_id").on(t.pageId),
      indx1: index("createdBy").on(t.createdBy),
    };
  },
);
export const block_backupRelations = relations(block_backup, ({ one }) => ({
  page: one(page, { fields: [block_backup.pageId], references: [page.id] }),
}));
