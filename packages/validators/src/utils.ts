import { z } from "zod";

export const notEmpty = z
  .string()
  .min(1, { message: "Dit veld mag niet leeg zijn." });
