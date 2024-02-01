import { v4 } from "uuid";
import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { userFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.user).orderBy(desc(schema.user.id));
    return ctx.db.query.user.findMany({
      orderBy: desc(schema.user.id),
      limit: 10,
      with: {
        role: true,
      },
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.user)
      //   .where(eq(schema.user.id, input.id));

      const user = await ctx.db.query.user.findFirst({
        where: eq(schema.user.id, input.id),
      });
      return user ?? null;
    }),

  create: protectedProcedure
    .input(userFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.user).values({ ...input, id: v4() });
    }),

  update: protectedProcedure
    .input(userFormSchema.extend({ id: z.string().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.user)
        .set(input)
        .where(eq(schema.user.id, id));
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.user).where(eq(schema.user.id, input));
  }),
});
