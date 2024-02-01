import { relations } from "drizzle-orm";
import { index, mysqlEnum } from "drizzle-orm/mysql-core";

import { createdAt, id, nnDec, nnInt, updatedAt, varChar } from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";

export const order = mySqlTable(
  "order",
  {
    id,
    userId: varChar("user_id"),
    status: mysqlEnum("status", [
      "new",
      "paid",
      "cancelled",
      "progress",
      "completed",
    ]),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("user_id").on(t.userId),
    };
  },
);

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, { fields: [order.userId], references: [user.id] }),
  items: many(orderItem),
}));

export const orderItem = mySqlTable(
  "orderItem",
  {
    id,
    orderId: nnInt("order_id"),
    price: nnDec("price_id"),
    quantity: nnInt("quantity"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("order_id").on(t.orderId),
    };
  },
);

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, { fields: [orderItem.orderId], references: [order.id] }),
}));
