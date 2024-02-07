import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { cartFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const cartRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.cart);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.cart.findMany({
      orderBy: desc(schema.cart.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
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
            orderBy = desc(schema.cart[sort]);
          } else {
            orderBy = schema.cart[sort];
          }
        }
      } else {
        orderBy = desc(schema.cart.id);
      }
      return ctx.db.query.cart.findMany({
        limit,
        offset,
        orderBy,
        with: {
          user: true,
        },
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.cart.findFirst({
        where: eq(schema.cart.id, input.id),
        with: {
          user: true,
        },
      });
    }),
  create: protectedProcedure
    .input(cartFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.cart).values(input);
    }),
});
