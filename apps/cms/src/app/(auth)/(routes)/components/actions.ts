"use server";

import { signIn } from "@acme/auth";

export const googleSignin = async () => {
  await signIn("google");
};
