import { z } from "zod";

export const notEmptyString = z
  .string({
    errorMap: () => ({ message: "Dit veld mag niet leeg zijn." }),
  })
  .min(1, { message: "Dit veld mag niet leeg zijn." });

export const notEmptyNumber = z
  .number({
    errorMap: () => ({ message: "Dit veld mag niet leeg zijn." }),
  })
  .min(1, { message: "Dit veld mag niet leeg zijn." });

export const optionalString = z.string().optional().nullable();
export const optionalNumber = z.number().optional().nullable();

export const formButton = z.object({
  title: z.string(),
  href: z.string(),
  target: z.string().optional(),
  withArrow: z.boolean().optional(),
  variant: z.string().optional(),
  rounded: z.string().optional(),
  size: z.string().optional(),
});
