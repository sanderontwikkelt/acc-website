import type Stripe from "stripe";

import { db, eq, schema } from "@acme/db";

import { stripe } from ".";

// retrieves a Stripe customer id for a given user if it exists or creates a new one
export const getOrCreateStripeCustomerIdForUser = async ({
  userId,
}: {
  userId: string;
}) => {
  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, userId),
  });

  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // create a new customer
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    // use metadata to link this Stripe customer to internal user id
    metadata: {
      userId,
    },
  });

  // update with new customer id
  await db
    .update(schema.user)
    .set({
      stripeCustomerId: customer.id,
    })
    .where(eq(schema.user.id, userId));

  return customer.id;
};

export const handleSessionCompleted = async ({
  event,
}: {
  event: Stripe.Event;
}) => {
  const session = event.data.object as Stripe.Checkout.Session;

  // Retrieve the session from Stripe to get details
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  console.log("items: ", fullSession.line_items.data);
  // Retrieve all cart items from the session
  const cartItems = fullSession.line_items.data.map((item) => ({
    priceId: item.price.id,
    quantity: item.quantity,
    // Add other relevant fields as needed
  }));

  // Assuming you have a userId associated with the session, retrieve it
  // This could be part of metadata or derived in some other way
  const orderId = fullSession.metadata.orderId;

  // Create an order in your database
  const order = await db.update(schema.order).set({
    status: "paid",
  });

  console.log({ order });

  await db.insert(schema.orderItem).values(
    cartItems.map((item) => ({
      ...item,
      orderId: order.insertId,
    })),
  );

  console.log("Order created successfully:", order);
};

// export const handleInvoicePaid = async ({
//   event,
//   stripe,
//   prisma,
// }: {
//   event: Stripe.Event;
//   stripe: Stripe;
//   prisma: PrismaClient;
// }) => {
//   const invoice = event.data.object as Stripe.Invoice;
//   const subscriptionId = invoice.subscription;
//   const subscription = await stripe.subscriptions.retrieve(
//     subscriptionId as string
//   );
//   const userId = subscription.metadata.userId;

//   // update user with subscription data
//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       stripeSubscriptionId: subscription.id,
//       stripeSubscriptionStatus: subscription.status,
//     },
//   });
// };

// export const handleSubscriptionCreatedOrUpdated = async ({
//   event,
//   prisma,
// }: {
//   event: Stripe.Event;
//   prisma: PrismaClient;
// }) => {
//   const subscription = event.data.object as Stripe.Subscription;
//   const userId = subscription.metadata.userId;

//   // update user with subscription data
//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       stripeSubscriptionId: subscription.id,
//       stripeSubscriptionStatus: subscription.status,
//     },
//   });
// };

// export const handleSubscriptionCanceled = async ({
//   event,
//   prisma,
// }: {
//   event: Stripe.Event;
//   prisma: PrismaClient;
// }) => {
//   const subscription = event.data.object as Stripe.Subscription;
//   const userId = subscription.metadata.userId;

//   // remove subscription data from user
//   await prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       stripeSubscriptionId: null,
//       stripeSubscriptionStatus: null,
//     },
//   });
// };
