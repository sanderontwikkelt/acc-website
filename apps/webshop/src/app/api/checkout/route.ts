import type { Locale, PaymentMethod } from "@mollie/api-client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { env } from "src/env";
import { api } from "src/trpc/server";

import { db, schema } from "@acme/db";

import { WEB_URL } from "~/lib/constants";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const { cartId, orderId, method } = body as {
      cartId: number;
      orderId: number;
      method: PaymentMethod;
    };

    if (!(cartId && orderId)) {
      return NextResponse.json({ error: "INVALID DATA" }, { status: 500 });
    }

    const cart = await api.cart.byId.query({ id: cartId });

    const price = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const charged = price.toFixed(2);

    const mollie = createMollieClient({ apiKey: env.MOLLIE_API_KEY });
    const payment = await mollie.payments.create({
      amount: {
        currency: "EUR",
        value: String(charged),
      },
      description: "Bestelling by Physis Academy",
      redirectUrl: `${WEB_URL}/success`,
      webhookUrl: `${"https://d02a-2a02-a45b-aaea-1-415a-b1b5-222-de85.ngrok-free.app" || WEB_URL}/api/webhooks/mollie`,
      locale: "nl_NL" as Locale,
      metadata: { orderId },
      method,
    });

    await db.insert(schema.orderPayment).values({
      paymentId: payment.id,
      charged: +charged,
      method,
      orderId: +orderId,
    });

    return NextResponse.json({ href: payment._links.checkout.href });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
