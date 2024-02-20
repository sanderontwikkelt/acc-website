import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MOLLIE_API_KEY: z.string(),
    MOLLIE_WEBHOOK_SECRET: z.string(),
  },
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
  },
  client: {},
  VERCEL_URL: process.env.VERCEL_URL,

  runtimeEnv: {
    MOLLIE_API_KEY: process.env.MOLLIE_API_KEY,
    MOLLIE_WEBHOOK_SECRET: process.env.MOLLIE_WEBHOOK_SECRET,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
