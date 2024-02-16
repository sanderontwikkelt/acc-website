import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { libraryCategoryFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const libraryCategoryRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(schema.libraryCategory);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.libraryCategory.findMany({
      orderBy: desc(schema.libraryCategory.id),
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
            orderBy = desc(schema.libraryCategory[sort]);
          } else {
            orderBy = schema.libraryCategory[sort];
          }
        }
      } else {
        orderBy = desc(schema.libraryCategory.id);
      }
      return ctx.db.query.libraryCategory.findMany({
        limit,
        offset,
        orderBy,
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.libraryCategory.findFirst({
        where: eq(schema.libraryCategory.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(libraryCategoryFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.libraryCategory).values(input);
    }),
  update: protectedProcedure
    .input(libraryCategoryFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.libraryCategory)
        .set(input)
        .where(eq(schema.libraryCategory.id, +id));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.libraryCategory)
      .where(eq(schema.libraryCategory.id, input));
  }),
});
