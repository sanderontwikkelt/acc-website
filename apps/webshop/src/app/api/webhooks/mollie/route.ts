// pages/api/mollie-webhook.js

import { createMollieClient } from "@mollie/api-client";

// Secret key obtained from Mollie Dashboard
const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  console.log({ body });

  const mollieClient = createMollieClient({ apiKey: MOLLIE_API_KEY });
  const payment = await mollieClient.payments.get("tr_8WhJKGmgBy");
  console.log({ payment });
  // Send a 200 OK response to acknowledge receipt of the webhook event
  res.status(200).end();
}
