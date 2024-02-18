import { relations } from "drizzle-orm";
import { double, index, int, text } from "drizzle-orm/mysql-core";

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
    seoTitle: varChar("seo_title"),
    seoDescription: text("seo_description"),
    categoryId: int("category_id"),
    price: double("price").notNull(),
    stock: int("stock"),
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
  relatedProducts: many(relatedProduct, { relationName: "relatedProduct" }),
  variants: many(productVariant),
  paymentPlans: many(productPaymentPlan),
  category: one(productCategory, {
    fields: [product.categoryId],
    references: [productCategory.id],
    relationName: "productCategory",
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
      relationName: "mediaProduct",
    }),
    media: one(media, {
      fields: [productsToMedia.mediaId],
      references: [media.id],
      relationName: "productMedia",
    }),
  }),
);

export const relatedProduct = mySqlTable("relatedProduct", {
  productId: nnInt("product_id"),
  relatedProductId: nnInt("related_product_id"),
});

export const relatedProductRelations = relations(relatedProduct, ({ one }) => ({
  product: one(product, {
    fields: [relatedProduct.productId],
    references: [product.id],
    relationName: "parentProduct",
  }),
  relatedProduct: one(product, {
    fields: [relatedProduct.relatedProductId],
    references: [product.id],
    relationName: "relatedProduct",
  }),
}));

export const productVariant = mySqlTable(
  "productVariant",
  {
    id,
    productId: nnInt("product_id"),
    title: nnVarChar("title"),
    price: double("price"),
    stock: int("stock"),
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
  slug: nnVarChar("slug"),
  createdAt,
  updatedAt,
});

export const productCategoryRelations = relations(
  productCategory,
  ({ many }) => ({
    products: many(product),
  }),
);

export const productPaymentPlan = mySqlTable(
  "productPaymentPlan",
  {
    id,
    productId: nnInt("product_id"),
    rate: nnInt("rate"),
    frequency: nnVarChar("frequency"),
    length: nnInt("length"),
    price: double("price"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("product_id").on(t.productId),
    };
  },
);

export const productPaymentPlanRelations = relations(
  productPaymentPlan,
  ({ one }) => ({
    product: one(product, {
      fields: [productPaymentPlan.productId],
      references: [product.id],
    }),
  }),
);
