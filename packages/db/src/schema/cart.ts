import { relations } from "drizzle-orm";
import {
  index,
  unique,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { user } from "./auth";
import { product } from "./product";
import { id, nnInt, createdAt, updatedAt, varChar } from "../utils";

export const cartItem = mySqlTable(
  "cartItem",
  {
    id,
    cartId: nnInt("cartId"),
    productId: nnInt("productId"),
    quantity: nnInt("quantity"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("cartId").on(t.cartId),
      indx1: index("productId").on(t.productId),
    };
  },
);

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  cart: one(shoppingCart, {
    fields: [cartItem.cartId],
    references: [shoppingCart.id],
  }),
  product: one(product, {
    fields: [cartItem.productId],
    references: [product.id],
  }),
}));

export const shoppingCart = mySqlTable(
  "shoppingCart",
  {
    id,
    userId: varChar("userId"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: unique().on(t.userId),
    };
  },
);

export const shoppingCartRelations = relations(
  shoppingCart,
  ({ one, many }) => ({
    user: one(user, { fields: [shoppingCart.userId], references: [user.id] }),
    items: many(cartItem),
  }),
);
