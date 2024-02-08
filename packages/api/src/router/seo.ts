import { z } from "zod";

import { eq, schema } from "@acme/db";
import { seoFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const seoRouter = createTRPCRouter({
  byPageId: publicProcedure
    .input(z.object({ pageId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.seo.findFirst({
        where: eq(schema.seo.pageId, input.pageId),
        with: {
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(seoFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(schema.seo).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(seoFormSchema.extend({ pageId: z.number().min(1) }))
    .mutation(async ({ ctx, input: { pageId, ...input } }) => {
      return ctx.db
        .update(schema.seo)
        .set({
          ...input,
        })
        .where(eq(schema.seo.pageId, pageId));
    }),
});
