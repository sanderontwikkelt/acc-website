import { desc, eq, not, schema } from "@acme/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const permissionRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.permission.findMany({
      orderBy: desc(schema.permission.id),
      where: not(eq(schema.permission.id, 1)),
    });
  }),
});
