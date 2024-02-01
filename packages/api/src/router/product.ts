import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { productFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.product).productBy(desc(schema.product.id));
    return ctx.db.query.product.findMany({
      orderBy: desc(schema.product.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.product)
      //   .where(eq(schema.product.id, input.id));

      const product = await ctx.db.query.product.findFirst({
        where: eq(schema.product.id, input.id),
      });
      return product ?? null;
    }),

  create: protectedProcedure
    .input(productFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.product).values(input);
    }),

  update: protectedProcedure
    .input(productFormSchema.extend({ id: z.number().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.product)
        .set(input)
        .where(eq(schema.product.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.product).where(eq(schema.product.id, input));
  }),
});
