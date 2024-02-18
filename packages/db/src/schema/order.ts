import { relations } from "drizzle-orm";
import { double, index, int, mysqlEnum } from "drizzle-orm/mysql-core";

import { product, productPaymentPlan, productVariant } from ".";
import {
  createdAt,
  id,
  nnDec,
  nnInt,
  nnVarChar,
  updatedAt,
  varChar,
} from "../utils";
import { mySqlTable } from "./_table";
import { user } from "./auth";

export const order = mySqlTable(
  "order",
  {
    id,
    userId: nnVarChar("user_id"),
    status: mysqlEnum("status", [
      "WAITING_PAYMENT",
      "IN_PROGRESS",
      "WAITING",
      "FINISHED",
      "CANCELLED",
      "REFUNDED",
      "FAILED",
      "CONCEPT",
    ]),
    invoiceFirstName: nnVarChar("invoice_first_name"),
    invoiceLastName: nnVarChar("invoice_last_name"),
    invoiceCompanyName: varChar("invoice_company_name"),
    invoiceOccupation: varChar("invoice_occupation"),
    invoiceBTW: varChar("invoice_btw"),
    invoiceCountry: varChar("invoice_country"),
    invoiceStreet: nnVarChar("invoice_street"),
    invoiceAddressAdditional: varChar("invoice_address_additional"),
    invoicePostalCode: nnVarChar("invoice_postal_code"),
    invoiceEmail: nnVarChar("invoice_email"),
    invoiceCity: nnVarChar("invoice_city"),
    invoicePhone: nnVarChar("invoice_phone"),
    invoicePaymentMethod: mysqlEnum("invoice_payment_method", [
      "ideal",
      "credit_card",
    ]),
    invoicePaymentBank: varChar("invoice_payment_bank"),
    invoiceAdditionalInformation: varChar("invoice_additional_information"),
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
  notifications: many(orderNotification),
}));

export const orderItem = mySqlTable(
  "orderItem",
  {
    id,
    orderId: nnInt("order_id"),
    price: double("price").notNull(),
    productId: nnInt("product_id"),
    productVariantId: nnInt("product_variant_id"),
    productPaymentPlanId: int("product_payment_plan_id"),
    quantity: nnInt("quantity"),
    createdAt,
    updatedAt,
  },
  (t) => {
    return {
      indx0: index("order_id").on(t.orderId),
      indx1: index("product_id").on(t.productId),
      indx2: index("product_variant_id").on(t.productVariantId),
      indx3: index("product_payment_plan_id").on(t.productPaymentPlanId),
    };
  },
);

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, { fields: [orderItem.orderId], references: [order.id] }),
  product: one(product, {
    fields: [orderItem.orderId],
    references: [product.id],
  }),
  productVariant: one(productVariant, {
    fields: [orderItem.orderId],
    references: [productVariant.id],
  }),
  productPaymentPlan: one(productPaymentPlan, {
    fields: [orderItem.orderId],
    references: [productPaymentPlan.id],
  }),
}));

export const orderNotification = mySqlTable(
  "orderNotification",
  {
    id,
    orderId: nnInt("order_id"),
    message: nnVarChar("message"),
    type: nnInt("type"),
    createdAt,
  },
  (t) => {
    return {
      indx0: index("order_id").on(t.orderId),
    };
  },
);

export const orderNotificationRelations = relations(
  orderNotification,
  ({ one }) => ({
    order: one(order, {
      fields: [orderNotification.orderId],
      references: [order.id],
    }),
  }),
);
