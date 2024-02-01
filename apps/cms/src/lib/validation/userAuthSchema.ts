import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().email({ message: "Vul een kloppend e-mail in" }),
  password: z.string().nonempty({ message: "Vul een wachtwoord in" }),
});
