import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { mediaFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const mediaRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.media).orderBy(desc(schema.media.id));
    return ctx.db.query.media.findMany({
      orderBy: desc(schema.media.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.media)
      //   .where(eq(schema.media.id, input.id));

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
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.media)
        .set(input)
        .where(eq(schema.media.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.media).where(eq(schema.media.id, input));
  }),
});
