import { relations } from "drizzle-orm";
import { index, int } from "drizzle-orm/mysql-core";

import { createdAt, id, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";

export const settings = mySqlTable(
  "settings",
  {
    id,
    name: varChar("name"),
    email: varChar("email"),
    createdAt,
    updatedAt,
    mediaId: int("media_id"),
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const settingsRelations = relations(settings, ({ one }) => ({
  media: one(media, { fields: [settings.mediaId], references: [media.id] }),
}));
