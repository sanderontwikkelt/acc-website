import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { orderFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { addOrderNotification } from "../utils";

export const orderRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.order);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.order.findMany({
      orderBy: desc(schema.order.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        status: z.enum([
          "WAITING_PAYMENT",
          "IN_PROGRESS",
          "WAITING",
          "FINISHED",
          "CANCELLED",
          "REFUNDED",
          "FAILED",
          "CONCEPT",
        ]),
      }),
    )
    .query(({ ctx, input }) => {
      const limit = input.perPage || 10;
      const offset = input.page ? (input.page - 1) * limit : 0;

      let orderBy = undefined;
      if (input.sort) {
        const [sort, order] = input.sort.split(".") as ["id", "desc" | "asc"];
        if (sort) {
          if (order === "desc") {
            orderBy = desc(schema.order[sort]);
          } else {
            orderBy = schema.order[sort];
          }
        }
      } else {
        orderBy = desc(schema.order.id);
      }
      return ctx.db.query.order.findMany({
        with: {
          items: true,
          user: true,
        },
        limit,
        offset,
        orderBy,
        ...(input.status && {
          where: eq(schema.order.status, input.status),
        }),
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.order.findFirst({
        where: eq(schema.order.id, input.id),
        with: {
          items: true,
          user: true,
        },
      });
    }),

  create: protectedProcedure
    .input(orderFormSchema)
    .mutation(({ ctx, input: { orderItems, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        const { insertId } = await tx.insert(schema.order).values(input);
        await tx
          .insert(schema.orderItem)
          .values(orderItems.map((item) => ({ ...item, orderId: +insertId })));
        await addOrderNotification(+insertId, 0)();
        await tx.insert(schema.orderNotification).values({
          orderId: +insertId,
          message: "Bestelling geplaatst",
          type: 1,
        });
      });
    }),
  update: protectedProcedure
    .input(orderFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        await tx
          .update(schema.order)
          .set(input)
          .where(eq(schema.order.id, +id));
      });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.order).where(eq(schema.order.id, input));
  }),
});
