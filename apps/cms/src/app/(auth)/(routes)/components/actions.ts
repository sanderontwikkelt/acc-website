"use server";

import { notEmptyString } from "node_modules/@acme/validators/src/utils";
import { z } from "zod";

import { signIn } from "@acme/auth";
import { and, db, eq, schema } from "@acme/db";

export const googleSignin = async () => {
  await signIn("google");
};

export const loginEmail = async (
  prevState: {
    message: string;
  },
  formData: FormData,
) => {
  const formSchema = z.object({
    email: notEmptyString.email(),
  });
  const parse = formSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parse.success) {
    return { message: "Vul een geldig e-mail in" };
  }

  const data = parse.data;

  const user = await db.query.user.findFirst({
    where: and(
      eq(schema.user.email, data.email),
      eq(schema.user.isAdmin, true),
    ),
  });

  if (!user) {
    return { message: "Geen account gevonden voor dit e-mail" };
  }

  return signIn("email", { email: data.email });
};

export const loginGoogle = async () => {
  await signIn("google");
};
