import { eq, schema } from "@acme/db";
import { headerFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const headerRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.header.findFirst({
      where: eq(schema.header.id, 1),
      with: {
        media: true,
      },
    });
  }),
  update: protectedProcedure
    .input(headerFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(schema.header)
        .set(input)
        .where(eq(schema.header.id, 1));
    }),
});
