import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { roleFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const roleRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.role);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.role.findMany({
      orderBy: desc(schema.role.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.role.findMany({
        with: {
          permissions: true
        },
        limit: input.perPage || 10,
        offset: input.page ? input.page - 1 : 0,
        orderBy: desc(schema.role.id)
      })
      // return ctx.db
      //   .select()
      //   .from(schema.role)
      //   .orderBy(desc(schema.role.id))
      //   .limit(input.perPage || 10)
      //   .offset(input.page ? input.page - 1 : 0)
      //   .leftJoin(schema.permission, eq(schema.user.roleId, schema.role.id));
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.role)
      //   .where(eq(schema.role.id, input.id));

      return ctx.db.query.role.findFirst({
        where: eq(schema.role.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(roleFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.role).values(input);
    }),

  update: protectedProcedure
    .input(roleFormSchema.extend({ id: z.number().min(1) }))
    .mutation(({ ctx, input: { id, ...input } }) => {
      return ctx.db
        .update(schema.role)
        .set(input)
        .where(eq(schema.role.id, id));
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.role).where(eq(schema.role.id, input));
  }),
});
