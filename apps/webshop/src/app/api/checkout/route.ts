import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { createMollieClient } from '@mollie/api-client';
import type { orderFormSchema } from "@acme/validators";
import { api } from "src/trpc/server";
import type { z } from "zod";
import { WEB_URL } from "~/lib/constants";
import { env } from "src/env";

type OrderFormValues = z.infer<typeof orderFormSchema>;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { 
    cartId,
    orderData
   } = body as { 
    cartId: number;
    orderData: OrderFormValues
  };

  if (!(cartId && orderData)) {
    return NextResponse.json({ error: "INVALID DATA" }, { status: 500 });
  }

  const cart = await api.cart.byId.query({id:cartId});

  const order = await api.order.create.mutate({
    ...orderData,
    orderItems: cart.items
  })

  const price = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const mollie = createMollieClient({ apiKey: env.MOLLIE_API_KEY });
  const payment = await mollie.payments.create({
      amount: {
        currency: "EUR",
        value: `${(price).toFixed(2)}`,
      },
      description: "Bestelling by Physis Academy",
      redirectUrl: `${
        WEB_URL
      }/success`,
      cancelUrl: `${WEB_URL}/`,
      webhookUrl: "",
      locale: "nl_NL",
      metadata: { orderId: order.id },
      method: "ideal",
  })

  console.log({payment})

  try {
    return NextResponse.json({ payment });
  } catch (error) {
    console.log("[PAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
