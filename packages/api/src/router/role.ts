import { z } from "zod";

import { desc, eq, schema } from "@acme/db";
import { roleFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const roleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.role).orderBy(desc(schema.role.id));
    return ctx.db.query.role.findMany({
      orderBy: desc(schema.role.id),
      limit: 10,
      with: {
        permissions: true,
      },
    });
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
