import { relations } from "drizzle-orm";
import { decimal, index, int, text } from "drizzle-orm/mysql-core";

import { media } from ".";
import { createdAt, id, nnInt, nnVarChar, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";

export const product = mySqlTable(
  "product",
  {
    id,
    slug: nnVarChar("slug"),
    title: nnVarChar("title"),
    description: text("description").notNull(),
    seoTitle: varChar("seo-title"),
    seoDescription: text("seo-description"),
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
  images: many(media),
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

export const productsToMediaRelations = relations(
  productsToMedia,
  ({ one }) => ({
    product: one(product, {
      fields: [productsToMedia.productId],
      references: [product.id],
    }),
    image: one(media, {
      fields: [productsToMedia.mediaId],
      references: [media.id],
    }),
  }),
);

export const productsToProducts = mySqlTable("productsToProducts", {
  productId: nnInt("product_id"),
  relatedProductId: nnInt("related_product_id"),
});

export const productsToProductsRelations = relations(
  productsToProducts,
  ({ one }) => ({
    product: one(product, {
      fields: [productsToProducts.productId],
      references: [product.id],
    }),
    relatedProduct: one(product, {
      fields: [productsToProducts.relatedProductId],
      references: [product.id],
    }),
  }),
);

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
  product: one(product, {
    fields: [productVariant.productId],
    references: [product.id],
  }),
}));

export const productCategory = mySqlTable("productCategory", {
  id,
  title: nnVarChar("title"),
  createdAt,
  updatedAt,
});

export const productCategoryRelations = relations(
  productCategory,
  ({ many }) => ({
    products: many(product),
  }),
);
