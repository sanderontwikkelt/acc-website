import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { pageFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const pageRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.page);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.page.findMany({
      orderBy: desc(schema.page.id),
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
            orderBy = desc(schema.page[sort]);
          } else {
            orderBy = schema.page[sort];
          }
        }
      } else {
        orderBy = desc(schema.page.id);
      }
      return ctx.db.query.page.findMany({
        with: {
          createdBy: true,
          updatedBy: true,
        },
        limit,
        offset,
        orderBy,
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.page.findFirst({
        where: eq(schema.page.id, input.id),
        with: {
          createdBy: true,
          updatedBy: true,
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(pageFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(schema.page).values({
        ...input,
        pathname: input.pathname.startsWith("/")
          ? input.pathname
          : `/${input.pathname}`,
        createdBy: ctx.session.user.id,
        updatedBy: ctx.session.user.id,
      });
    }),
  update: protectedProcedure
    .input(pageFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      const page = await ctx.db.query.page.findFirst({
        where: eq(schema.page.id, id),
      });
      if (!page) return;

      return ctx.db.transaction(async (tx) => {
        await tx.insert(schema.block_backup).values({
          blocks: page.blocks,
          pageId: page.id,
          createdBy: ctx.session.user.id,
        });

        await tx.update(schema.page).set(input).where(eq(schema.page.id, +id));
      });
    }),
    updateBlocks: protectedProcedure
    .input(z.object({ id: z.number().min(1), blocks: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id, blocks } }) => {
      const page = await ctx.db.query.page.findFirst({
        where: eq(schema.page.id, id),
      });
      if (!page) return;

      return ctx.db.transaction(async (tx) => {
        await tx.insert(schema.block_backup).values({
          blocks: page.blocks,
          pageId: page.id,
          createdBy: ctx.session.user.id,
        });

        await tx.update(schema.page).set({ blocks }).where(eq(schema.page.id, +id));
      });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.page).where(eq(schema.page.id, input));
  }),
});
