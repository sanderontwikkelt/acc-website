/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db, eq, schema } from "@acme/db";
import { sendEmail } from "@acme/email";
import { stripe } from "@acme/stripe";

import { env } from "~/env";

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      webhookSecret,
    );
    const orderId = (event.data.object as any).client_reference_id;
    const customer = (event.data.object as any).customer_details;
    if (event.type === "checkout.session.completed") {
      if (!customer?.email) {
        throw new Error(`missing user email, ${event.id}`);
      }

      if (!orderId) {
        throw new Error(`missing order_id on metadata, ${event.id}`);
      }

      await db
        .update(schema.order)
        .set({
          status: "paid",
        })
        .where(eq(schema.order.id, orderId as number));
      await sendEmail({ name: "order_received" }, customer?.email!);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "something went wrong",
        ok: false,
      },
      { status: 500 },
    );
  }
}
