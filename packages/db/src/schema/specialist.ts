import { relations } from "drizzle-orm";
import { index, text } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";

export const specialist = mySqlTable(
  "specialist",
  {
    id,
    title: varChar("title"),
    name: varChar("name"),
    description: text("description"),
    mediaId: nnInt("media_id"),
    address: varChar("address"),
    website: varChar("website"),
    phoneNumber: varChar("phoneNumber"),
    email: varChar("email"),
    body: varChar("body"),
    lat: varChar("lat"),
    lng: varChar("lng"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("media_id").on(t.mediaId),
    };
  },
);

export const specialistRelations = relations(specialist, ({ one }) => ({
  media: one(media, { fields: [specialist.mediaId], references: [media.id] }),
}));
