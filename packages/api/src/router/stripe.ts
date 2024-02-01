import { env } from "@acme/auth/env";
import { schema } from "@acme/db";
import { getOrCreateStripeCustomerIdForUser, stripe } from "@acme/stripe";
import { checkoutSessionFormSchema } from "@acme/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(checkoutSessionFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user?.id;
      const customerId = await getOrCreateStripeCustomerIdForUser({
        userId,
      });

      if (!customerId) {
        throw new Error("Could not create customer");
      }

      const baseUrl = env.AUTH_URL;

      const order = await ctx.db
        .insert(schema.order)
        .values({ userId, status: "new" });
      const orderId = order.insertId;

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: orderId,
        payment_method_types: ["card", "ideal"],
        mode: "payment",
        line_items: input,
        success_url: `${
          "http://localhost:3002" || baseUrl
        }/checkout?checkoutSuccess=true`,
        cancel_url: `${
          "http://localhost:3002" || baseUrl
        }/checkout?checkoutCanceled=true`,
        payment_intent_data: {
          metadata: {
            orderId,
          },
        },
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),
  createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const customerId = await getOrCreateStripeCustomerIdForUser({
      userId: ctx.session.user?.id,
    });

    if (!customerId) {
      throw new Error("Could not create customer");
    }

    const baseUrl = env.AUTH_URL;

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
