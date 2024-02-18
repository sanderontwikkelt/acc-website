import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
import { libraryFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const libraryRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.library);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.library.findMany({
      orderBy: desc(schema.library.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        categoryIds: z.array(z.number()).optional(),
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
            orderBy = desc(schema.library[sort]);
          } else {
            orderBy = schema.library[sort];
          }
        }
      } else {
        orderBy = desc(schema.library.id);
      }
      return ctx.db.query.library.findMany({
        with: {
          category: true,
        },
        limit,
        offset,
        orderBy,
        ...(input.categoryIds && {
          where: or(
            ...input.categoryIds.map((categoryId) =>
              eq(schema.libraryCategory.id, categoryId),
            ),
          ),
        }),
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.library.findFirst({
        where: eq(schema.library.id, input.id),
        with: {
          relatedLibraries: true,
          category: true,
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(libraryFormSchema)
    .mutation(({ ctx, input: { relatedLibraryIds, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        const library = await tx.insert(schema.library).values(input);

        if (relatedLibraryIds?.length)
          await tx
            .insert(schema.relatedLibrary)
            .values(
              relatedLibraryIds
                .filter((id, idx, ids) => ids.indexOf(id) === idx)
                .map((id) => ({
                  libraryId: +library.insertId,
                  relatedLibraryId: +id,
                })),
            );
      });
    }),
  update: protectedProcedure
    .input(libraryFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, relatedLibraryIds, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        await tx
          .delete(schema.relatedLibrary)
          .where(eq(schema.relatedLibrary.libraryId, +id));
        if (relatedLibraryIds?.length)
          await tx
            .insert(schema.relatedLibrary)
            .values(
              relatedLibraryIds
                .filter((_id, idx, ids) => ids.indexOf(_id) === idx)
                .map((_id) => ({ libraryId: id, relatedLibraryId: +_id })),
            );

        await tx
          .update(schema.library)
          .set(input)
          .where(eq(schema.library.id, +id));
      });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.library).where(eq(schema.library.id, input));
  }),
});
