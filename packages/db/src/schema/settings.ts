import { relations } from "drizzle-orm";
import { index, int} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { media } from "./media";
import { id, varChar, createdAt, updatedAt } from "../utils";

export const settings = mySqlTable(
  "settings",
  {
    id,
    name: varChar("name"),
    email: varChar("email"),
    createdAt,
    updatedAt,
    mediaId: int("mediaId"),
  },
  (t) => {
    return {
      indx0: index("mediaId").on(t.mediaId),
    };
  },
);

export const settingsRelations = relations(settings, ({ one }) => ({
  media: one(media, { fields: [settings.mediaId], references: [media.id] }),
}));
