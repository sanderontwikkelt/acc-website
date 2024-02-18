import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMollieClient, Locale, PaymentMethod } from "@mollie/api-client";
import { env } from "src/env";
import { api } from "src/trpc/server";

import { WEB_URL } from "~/lib/constants";

export async function POST(req: NextRequest) {
  const body = await req.json();

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

  const mollie = createMollieClient({ apiKey: env.MOLLIE_API_KEY });
  const payment = await mollie.payments.create({
    amount: {
      currency: "EUR",
      value: `${price.toFixed(2)}`,
    },
    description: "Bestelling by Physis Academy",
    redirectUrl: `${WEB_URL}/success`,
    // webhookUrl: `${WEB_URL}/api/webhooks/mollie`,
    locale: "nl_NL" as Locale,
    metadata: { orderId },
    method,
  });

  console.log({ payment });

  try {
    return NextResponse.json({ payment });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
