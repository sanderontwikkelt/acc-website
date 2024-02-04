import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
import { mediaFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const mediaRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.media);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.media.findMany({
      orderBy: desc(schema.media.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        mimetype: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const limit = input.perPage || 10;
      const offset = input.page ? (input.page - 1) * limit : 0;

      let orderBy = undefined;
      if (input.sort) {
        const [field, order] = input.sort.split(".") as ["id", "desc" | "asc"];
        if (field) {
          if (order === "desc") {
            orderBy = desc(schema.media[field]);
          } else {
            orderBy = schema.media[field];
          }
        }
      } else {
        orderBy = desc(schema.media.id);
      }

      return ctx.db.query.media.findMany({
        limit,
        offset,
        orderBy,
        ...(input.mimetype && {
          where: or(
            ...input.mimetype
              .split(".")
              .map((mimetype) => eq(schema.media.mimetype, mimetype)),
          ),
        }),
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.media.findFirst({
        where: eq(schema.media.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(mediaFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.media).values(input);
    }),
  update: protectedProcedure
    .input(mediaFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.media)
        .set(input)
        .where(eq(schema.media.id, +id));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.media).where(eq(schema.media.id, input));
  }),
});
