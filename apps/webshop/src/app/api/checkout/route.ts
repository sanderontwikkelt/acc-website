import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { PaymentMethod } from "@acme/mollie";
import { db, eq, schema } from "@acme/db";
import { createPayment } from "@acme/mollie";

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

    const cart = await db.query.cart.findFirst({
      where: eq(schema.cart.id, cartId),
      with: {
        items: {
          with: {
            product: true,
          },
        },
      },
    });

    const price = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    const charged = price.toFixed(2);

    const payment = await createPayment({ charged, orderId, method });

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
