import { relations } from "drizzle-orm";
import { index, int, unique } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, nnVarChar, updatedAt } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";
import { product, productPaymentPlan, productVariant } from "./product";

export const cartItem = mySqlTable(
  "cartItem",
  {
    id,
    cartId: nnInt("cart_id"),
    productId: nnInt("product_id"),
    productVariantId: nnInt("product_variant_id"),
    productPaymentPlanId: int("product_payment_plan_id"),
    quantity: nnInt("quantity"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("cart_id").on(t.cartId),
      indx1: index("product_id").on(t.productId),
      indx2: index("product_variant_id").on(t.productVariantId),
      indx3: index("product_payment_plan_id").on(t.productPaymentPlanId),
    };
  },
);

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItem.cartId],
    references: [cart.id],
  }),
  product: one(product, {
    fields: [cartItem.productId],
    references: [product.id],
  }),
  productVariant: one(productVariant, {
    fields: [cartItem.productVariantId],
    references: [productVariant.id],
  }),
  productPaymentPlan: one(productPaymentPlan, {
    fields: [cartItem.productPaymentPlanId],
    references: [productPaymentPlan.id],
  }),
}));

export const cart = mySqlTable(
  "cart",
  {
    id,
    userId: nnVarChar("user_id"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: unique().on(t.userId),
    };
  },
);

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(user, { fields: [cart.userId], references: [user.id] }),
  items: many(cartItem),
}));
