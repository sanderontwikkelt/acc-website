import { relations } from "drizzle-orm";
import { decimal, index, int, text } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";

export const product = mySqlTable(
  "product",
  {
    id,
    slug: nnVarChar("slug"),
    title: nnVarChar("title"),
    description: text("description").notNull(),
    categoryId: int("category_id"),
    price: decimal("price").notNull(),
    stock: nnInt("stock"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("category_id").on(t.categoryId),
    };
  },
);

export const productRelations = relations(product, ({ many, one }) => ({
  images: many(productsToMedia),
  relatedProducts: many(productsToProducts),
  variants: many(productVariant),
  category: one(productCategory, {
    fields: [product.categoryId],
    references: [productCategory.id],
  }),
}));

export const productsToMedia = mySqlTable("productsToMedia", {
  productId: nnInt("product_id"),
  mediaId: nnInt("media_id"),
});

export const productsToProducts = mySqlTable("productsToProducts", {
  productId: nnInt("product_id"),
  relatedProductId: nnInt("related_product_id"),
});

export const productVariant = mySqlTable(
  "productVariant",
  {
    id,
    productId: nnInt("product_id"),
    title: nnVarChar("title"),
    price: decimal("price"),
    stock: nnInt("stock"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("product_id").on(t.productId),
    };
  },
);

export const productVariantRelations = relations(productVariant, ({ one }) => ({
  product: one(product, { fields: [productVariant.productId], references: [product.id] }),
}));

export const productCategory = mySqlTable(
  "productCategory",
  {
    id,
    title: nnVarChar("title"),
    createdAt,
    updatedAt,
  },
);

export const productCategoryRelations = relations(productCategory, ({ many }) => ({
  products: many(product),
}));

