import type { Locale, PaymentMethod } from "@mollie/api-client";

import { mollie } from ".";
import { env } from "../env";

const url = env.VERCEL_URL || process.env.NEXT_PUBLIC_FRONT_URL;
const secret = env.MOLLIE_WEBHOOK_SECRET;

export { PaymentMethod };

export const getPayment = async (id: string) => {
  return mollie.payments.get(id);
};

export const validateToken = (token: string) => {
  return token === secret;
};

export const createPayment = async ({
  charged,
  orderId,
  method,
}: {
  charged: string;
  orderId: number;
  method: PaymentMethod;
}) => {
  return mollie.payments.create({
    amount: {
      currency: "EUR",
      value: charged,
    },
    description: "Bestelling by Accuraat Verhuur",
    redirectUrl: `${url}/bedankt-pagina`,
    webhookUrl: `${"https://c88e-2a02-a45b-aaea-1-28c5-1f58-15a3-7883.ngrok-free.app" || url}/api/webhooks/mollie/${secret}`,
    locale: "nl_NL" as Locale,
    metadata: { orderId },
    method,
  });
};
