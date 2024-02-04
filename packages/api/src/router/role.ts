import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
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
        permissionIds: z.array(z.number()).optional(),
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
            orderBy = desc(schema.role[sort]);
          } else {
            orderBy = schema.role[sort];
          }
        }
      } else {
        orderBy = desc(schema.role.id);
      }
      return ctx.db.query.role.findMany({
        with: {
          permissions: true,
        },
        limit,
        offset,
        orderBy,
        ...(input.permissionIds && {
          where: or(
            ...[1, ...input.permissionIds].map((permissionId) =>
              eq(schema.permission.id, permissionId),
            ),
          ),
        }),
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
        with: {
          permissions: true,
        },
      });
    }),

  create: protectedProcedure
    .input(roleFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        const role = await tx.insert(schema.role).values(input);
        await tx
          .insert(schema.rolesToPermissions)
          .values(
            input.permissionIds
              .filter((id, idx, ids) => ids.indexOf(id) === idx)
              .map((id) => ({ roleId: +role.insertId, permissionId: +id })),
          );
      });
    }),
  update: protectedProcedure
    .input(roleFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, permissionIds, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        await tx
          .delete(schema.rolesToPermissions)
          .where(eq(schema.rolesToPermissions.roleId, +id));
        await tx
          .insert(schema.rolesToPermissions)
          .values(
            permissionIds
              .filter((_id, idx, ids) => ids.indexOf(_id) === idx)
              .map((pId) => ({ roleId: +id, permissionId: +pId })),
          );
        return tx.update(schema.role).set(input).where(eq(schema.role.id, +id));
      });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.role).where(eq(schema.role.id, input));
  }),
});
