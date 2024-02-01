import { relations } from "drizzle-orm";
import { index, int, json, text } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";
import { seo } from "./seo";

export const header = mySqlTable(
  "header",
  {
    id,
    createdAt,
    updatedAt,
    mediaId: int("mediaId"),
    navigation: json("navigation"),
    links: json("links"),
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
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
    title: text("title"),
    navigation: json("navigation"),
    links: json("links"),
    socials: json("socials"),
    informationLinks: json("informationLinks"),
    mediaId: int("mediaId"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
    };
  },
);

export const footerRelations = relations(footer, ({ one }) => ({
  media: one(media, { fields: [footer.mediaId], references: [media.id] }),
}));

export const page = mySqlTable("page", {
  id,
  pathname: varChar("pathname"),
  name: varChar("name"),
  concept: int("concept").default(1),
  blocks: json("blocks"),
  createdBy: varChar("createdBy"),
  updatedBy: varChar("updatedBy"),
  createdAt,
  updatedAt,
});

export const pageRelations = relations(page, ({ one, many }) => ({
  seo: one(seo),
  backups: many(block_backup),
}));

export const block_backup = mySqlTable(
  "blockBackup",
  {
    id,
    blocks: json("blocks"),
    pageId: nnInt("pageId"),
    createdAt,
  },
  (t) => {
    return {
      indx0: index("pageId").on(t.pageId),
    };
  },
);
export const block_backupRelations = relations(block_backup, ({ one }) => ({
  page: one(page, { fields: [block_backup.pageId], references: [page.id] }),
}));
