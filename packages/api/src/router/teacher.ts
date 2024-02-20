import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { teacherFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { findCoordinates } from "../utils";

export const teacherRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.teacher);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.teacher.findMany({
      orderBy: desc(schema.teacher.id),
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
      const limit = input.perPage || 10;
      const offset = input.page ? (input.page - 1) * limit : 0;

      let orderBy = undefined;
      if (input.sort) {
        const [sort, order] = input.sort.split(".") as ["id", "desc" | "asc"];
        if (sort) {
          if (order === "desc") {
            orderBy = desc(schema.teacher[sort]);
          } else {
            orderBy = schema.teacher[sort];
          }
        }
      } else {
        orderBy = desc(schema.teacher.id);
      }
      return ctx.db.query.teacher.findMany({
        limit,
        offset,
        orderBy,
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.teacher.findFirst({
        where: eq(schema.teacher.id, input.id),
        with: {
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(teacherFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.address) {
        const coords = await findCoordinates(input.address);
        if (!coords?.error && coords.lat && coords.lng) {
          input.lat = coords.lat;
          input.lng = coords.lng;
        }
      }
      return ctx.db.insert(schema.teacher).values(input);
    }),
  update: protectedProcedure
    .input(teacherFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      if (input.address) {
        const coords = await findCoordinates(input.address);
        if (!coords?.error && coords.lat && coords.lng) {
          input.lat = coords.lat;
          input.lng = coords.lng;
        }
      }
      return ctx.db
        .update(schema.teacher)
        .set(input)
        .where(eq(schema.teacher.id, +id));
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.teacher).where(eq(schema.teacher.id, input));
  }),
});
