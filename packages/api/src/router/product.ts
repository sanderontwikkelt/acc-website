import { z } from "zod";

import { desc, eq, or, schema, sql } from "@acme/db";
import { productFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql<number>`count(*)` }).from(schema.product);
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.product.findMany({
      orderBy: desc(schema.product.id),
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
            orderBy = desc(schema.product[sort]);
          } else {
            orderBy = schema.product[sort];
          }
        }
      } else {
        orderBy = desc(schema.product.id);
      }
      return ctx.db.query.product.findMany({
        with: {
          variants: true,
          category: true,
        },
        limit,
        offset,
        orderBy,
        ...(input.categoryIds && {
          where: or(
            ...input.categoryIds.map((categoryId) =>
              eq(schema.productCategory.id, categoryId),
            ),
          ),
        }),
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.product.findFirst({
        where: eq(schema.product.id, input.id),
        with: {
          images: {
            with: {
              media: true,
            },
          },
          relatedProducts: true,
          variants: true,
          paymentPlans: true,
        },
      });
    }),

  create: protectedProcedure
    .input(productFormSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        const product = await tx.insert(schema.product).values(input);
        if (input.variants?.length)
          await tx.insert(schema.productVariant).values(
            input.variants.map(({ title, stock }) => ({
              productId: +product.insertId,
              title,
              stock,
            })),
          );

        if (input.paymentPlans?.length)
          await tx.insert(schema.productPaymentPlan).values(
            input.paymentPlans.map(({ rate, frequency, length, price }) => ({
              productId: +product.insertId,
              rate: rate || 1,
              frequency: frequency || "month",
              length: length || 1,
              price: price || input.price,
            })),
          );
        if (input.mediaIds?.length)
          await tx
            .insert(schema.productsToMedia)
            .values(
              input.mediaIds
                .filter((id, idx, ids) => ids.indexOf(id) === idx)
                .map((id) => ({ productId: +product.insertId, mediaId: +id })),
            );
        // if (input.relatedProductIds?.length)
        //   await tx.insert(schema.productsToProducts).values(
        //     input.relatedProductIds
        //       .filter((id, idx, ids) => ids.indexOf(id) === idx)
        //       .map((id) => ({
        //         productId: +product.insertId,
        //         relatedProductId: +id,
        //       })),
        //   );
      });
    }),
  update: protectedProcedure
    .input(productFormSchema.extend({ id: z.number().min(1) }))
    .mutation(
      async ({
        ctx,
        input: { id, mediaIds, variants, paymentPlans, ...input },
      }) => {
        return ctx.db.transaction(async (tx) => {
          await tx
            .delete(schema.productVariant)
            .where(eq(schema.productVariant.productId, +id));
          if (variants?.length)
            await tx.insert(schema.productVariant).values(
              variants.map(({ title, stock }) => ({
                productId: +id,
                title,
                stock,
              })),
            );

          await tx
            .delete(schema.productPaymentPlan)
            .where(eq(schema.productPaymentPlan.productId, +id));
          if (paymentPlans?.length)
            await tx.insert(schema.productPaymentPlan).values(
              paymentPlans.map(({ rate, frequency, length, price }) => ({
                productId: +id,
                rate: rate || 1,
                frequency: frequency || "month",
                length: length || 1,
                price: price || input.price,
              })),
            );

          await tx
            .delete(schema.productsToMedia)
            .where(eq(schema.productsToMedia.productId, +id));
          if (mediaIds?.length)
            await tx
              .insert(schema.productsToMedia)
              .values(
                mediaIds
                  .filter((id, idx, ids) => ids.indexOf(id) === idx)
                  .map((mediaId) => ({ productId: +id, mediaId: +mediaId })),
              );
          // await tx
          //   .delete(schema.productsToProducts)
          //   .where(eq(schema.productsToMedia.productId, +id));
          // await tx
          //   .insert(schema.productsToProducts)
          //   .values(
          //     relatedProductIds
          //       .filter((id, idx, ids) => ids.indexOf(id) === idx)
          //       .map((id) => ({ productId: +id, relatedProductId: +id })),
          //   );

          await tx
            .update(schema.product)
            .set(input)
            .where(eq(schema.product.id, +id));
        });
      },
    ),
  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.product).where(eq(schema.product.id, input));
  }),
});
