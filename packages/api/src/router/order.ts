import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { orderFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const orderRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.order).orderBy(desc(schema.order.id));
    return ctx.db.query.order.findMany({
      orderBy: desc(schema.order.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.order)
      //   .where(eq(schema.order.id, input.id));

      return ctx.db.query.order.findFirst({
        where: eq(schema.order.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(orderFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.order).values(input);
    }),

  update: protectedProcedure
    .input(orderFormSchema.extend({ id: z.number().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.order)
        .set(input)
        .where(eq(schema.order.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.order).where(eq(schema.order.id, input));
  }),
});
