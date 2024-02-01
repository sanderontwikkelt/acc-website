import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { teacherFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const teacherRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.teacher.findMany({
      orderBy: desc(schema.teacher.id),
      limit: 10,
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const teacher = await ctx.db.query.teacher.findFirst({
        where: eq(schema.teacher.id, input.id),
      });
      return teacher ?? null;
    }),

  create: protectedProcedure
    .input(teacherFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.teacher).values(input);
    }),

  update: protectedProcedure
    .input(teacherFormSchema.extend({ id: z.number().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.teacher)
        .set(input)
        .where(eq(schema.teacher.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.teacher).where(eq(schema.teacher.id, input));
  }),
});
