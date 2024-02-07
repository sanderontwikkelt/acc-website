import { relations } from "drizzle-orm";
import { index, unique } from "drizzle-orm/mysql-core";

import { createdAt, id, nnInt, nnVarChar, updatedAt } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";
import { product } from "./product";

export const cartItem = mySqlTable(
  "cartItem",
  {
    id,
    cartId: nnInt("cart_id"),
    productId: nnInt("product_id"),
    productVariantId: nnInt("product_variant_id"),
    quantity: nnInt("quantity"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("cart_id").on(t.cartId),
      indx1: index("product_id").on(t.productId),
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
