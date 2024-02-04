import { v4 } from "uuid";
import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
import { userFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.user);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.user.findMany({
      orderBy: desc(schema.user.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        roleIds: z.array(z.number()).optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const limit = input.perPage || 10;
      const offset = input.page ? (input.page - 1) * limit : 0;

      let orderBy = undefined;
      if (input.sort) {
        const [sort, order] = input.sort.split(".") as ["id", "desc" | "asc"];
        if (sort) {
          if (order === "desc") {
            orderBy = desc(schema.user[sort]);
          } else {
            orderBy = schema.user[sort];
          }
        }
      } else {
        orderBy = desc(schema.user.id);
      }

      return ctx.db.query.user.findMany({
        with: {
          role: true,
        },
        limit,
        offset,
        orderBy,
        ...(input.roleIds && {
          where: or(
            ...input.roleIds.map((roleId) => eq(schema.user.roleId, roleId)),
          ),
        }),
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
