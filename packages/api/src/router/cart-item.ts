import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { cartItemFormSchema, ownCartItemFormSchema } from "@acme/validators";

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
  createOwn: protectedProcedure
    .input(ownCartItemFormSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(9, ctx.session)
      if (!ctx.session) return new Error("UNAUTHENTICATED");
      let cartId: number;
      const cart = await ctx.db.query.cart.findFirst({
        where: eq(schema.cart.userId, ctx.session.user.id)
      })
      if (cart) {
        cartId = cart.id;
      } else {
        const insertCart = await ctx.db.insert(schema.cart).values({
          userId: ctx.session.user.id,
        })
        cartId = +insertCart.insertId;
      }
      return ctx.db.insert(schema.cartItem).values({
        ...input,
        cartId,
      });
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
