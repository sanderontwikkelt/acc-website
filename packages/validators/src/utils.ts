import { z } from "zod";

export const notEmptyString = z
  .string()
  .min(1, { message: "Dit veld mag niet leeg zijn." });

export const notEmptyNumber = z
  .number()
  .min(1, { message: "Dit veld mag niet leeg zijn." });
