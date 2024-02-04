import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { productCategoryFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productCategoryRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.productCategory);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.productCategory.findMany({
      orderBy: desc(schema.productCategory.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        categoryIds: z.array(z.number()).optional(),
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
            orderBy = desc(schema.productCategory[sort]);
          } else {
            orderBy = schema.productCategory[sort];
          }
        }
      } else {
        orderBy = desc(schema.productCategory.id);
      }
      return ctx.db.query.productCategory.findMany({
        limit,
        offset,
        orderBy,
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.productCategory.findFirst({
        where: eq(schema.productCategory.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(productCategoryFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.productCategory).values(input);
    }),
  update: protectedProcedure
    .input(productCategoryFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.productCategory)
        .set(input)
        .where(eq(schema.productCategory.id, +id));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.productCategory)
      .where(eq(schema.productCategory.id, input));
  }),
});
