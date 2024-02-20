import { createMollieClient } from "@mollie/api-client";

import { env } from "../env";

export const mollie = createMollieClient({ apiKey: env.MOLLIE_API_KEY });

export * from "./payment-webhook-handlers";
