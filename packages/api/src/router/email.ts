import { z } from "zod";

import { desc, eq, schema, sql } from "@acme/db";
import { emailFormSchema } from "@acme/validators";

import { getEmailContent } from "../emails";
import sendEmail from "../sendEmail";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.email);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.email.findMany({
      orderBy: desc(schema.email.id),
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
            orderBy = desc(schema.email[sort]);
          } else {
            orderBy = schema.email[sort];
          }
        }
      } else {
        orderBy = desc(schema.email.id);
      }
      return ctx.db.query.email.findMany({
        limit,
        offset,
        orderBy,
        with: {
          user: true,
        },
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.email.findFirst({
        where: eq(schema.email.id, input.id),
        with: {
          user: true,
          items: {
            with: {
              product: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(emailFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.email).values(input);
    }),
});
