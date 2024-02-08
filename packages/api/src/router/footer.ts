import { eq, schema } from "@acme/db";
import { footerFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const footerRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.footer.findFirst({
      where: eq(schema.footer.id, 1),
      with: {
        media: true,
      },
    });
  }),
  update: protectedProcedure
    .input(footerFormSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(schema.footer)
        .set(input)
        .where(eq(schema.footer.id, 1));
    }),
});
