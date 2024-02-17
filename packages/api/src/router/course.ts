import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
import { courseFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.course);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.course.findMany({
      orderBy: desc(schema.course.id),
    });
  }),
  list: protectedProcedure
    .input(
      z.object({
        perPage: z.number().optional(),
        page: z.number().optional(),
        sort: z.string().optional(),
        teacherIds: z.array(z.number()).optional(),
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
            orderBy = desc(schema.course[sort]);
          } else {
            orderBy = schema.course[sort];
          }
        }
      } else {
        orderBy = desc(schema.course.id);
      }
      return ctx.db.query.course.findMany({
        limit,
        offset,
        orderBy,
        with: {
          teachers: true,
        },
        ...(input.teacherIds && {
          where: or(
            ...input.teacherIds.map((id) =>
              eq(schema.teacher.id, id),
            ),
          ),
        }),
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.course.findFirst({
        where: eq(schema.course.id, input.id),
        with: {
          teachers: true,
          media: true,
          seoMedia: true,
        },
      });
    }),

  create: protectedProcedure
    .input(courseFormSchema)
    .mutation(({ ctx, input: {teacherIds, ...input} }) => {
      return ctx.db.transaction(async (tx) => {
        const course = await tx.insert(schema.course).values(input);
        
        if (teacherIds?.length)
          await tx
            .insert(schema.courseToTeacher)
            .values(
              teacherIds
                .filter((id, idx, ids) => ids.indexOf(id) === idx)
                .map((id) => ({ courseId: +course.insertId, teacherId: +id })),
            );
      });
    }),
  update: protectedProcedure
    .input(courseFormSchema.extend({ id: z.number().min(1) }))
    .mutation(async ({ ctx, input: { id, teacherIds, ...input } }) => {
      return ctx.db.transaction(async (tx) => {
        await tx
          .delete(schema.courseToTeacher)
          .where(eq(schema.courseToTeacher.courseId, +id));
          if (teacherIds?.length)
          await tx
            .insert(schema.courseToTeacher)
            .values(
              teacherIds
                .filter((_id, idx, ids) => ids.indexOf(_id) === idx)
                .map((_id) => ({ courseId: id, teacherId: +_id })),
            );

        await tx
          .update(schema.course)
          .set(input)
          .where(eq(schema.course.id, +id));
      });
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.course).where(eq(schema.course.id, input));
  }),
});
