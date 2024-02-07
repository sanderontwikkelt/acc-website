import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { cartItemFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const cartItemRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.cartItem.findMany({
      orderBy: desc(schema.cartItem.id),
    });
  }),
  create: protectedProcedure
    .input(cartItemFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.cartItem).values(input);
    }),
  updateCount: protectedProcedure
    .input(z.object({ id: z.number().min(1), quantity: z.number() }))
    .mutation(({ ctx, input: { id, quantity } }) => {
      return ctx.db
        .update(schema.cartItem)
        .set({ quantity })
        .where(eq(schema.cartItem.id, +id));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.cartItem).where(eq(schema.cartItem.id, input));
  }),
});
