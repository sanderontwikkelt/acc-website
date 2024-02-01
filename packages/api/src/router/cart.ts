import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { cartFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const shoppingCartRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.shoppingCart).shoppingCartBy(desc(schema.shoppingCart.id));
    return ctx.db.query.shoppingCart.findMany({
      orderBy: desc(schema.shoppingCart.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.shoppingCart)
      //   .where(eq(schema.shoppingCart.id, input.id));

      return ctx.db.query.shoppingCart.findFirst({
        where: eq(schema.shoppingCart.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(cartFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.shoppingCart).values(input);
    }),

  update: protectedProcedure
    .input(cartFormSchema.extend({ id: z.number().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.shoppingCart)
        .set(input)
        .where(eq(schema.shoppingCart.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db
      .delete(schema.shoppingCart)
      .where(eq(schema.shoppingCart.id, input));
  }),
});
