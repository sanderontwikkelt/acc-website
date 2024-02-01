import { relations } from "drizzle-orm";
import { decimal, index, int } from "drizzle-orm/mysql-core";

import { createdAt, id, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { media } from "./media";

export const product = mySqlTable(
  "product",
  {
    id,
    slug: varChar("slug"),
    title: varChar("title"),
    price: decimal("price"),
    stock: int("stock").notNull(),
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
export const productRelations = relations(product, ({ one, many }) => ({
  media: one(media, { fields: [product.mediaId], references: [media.id] }),
  relatedProducts: many(product),
  relatingProducts: many(product),
}));
