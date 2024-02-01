import { v4 } from "uuid";
import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { userFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.user);
  }),
  all: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(schema.user)
        .orderBy(desc(schema.user.id))
        .limit(input.perPage || 10)
        .offset(input.page ? input.page - 1 : 0)
        .leftJoin(schema.role, eq(schema.user.roleId, schema.role.id));
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
