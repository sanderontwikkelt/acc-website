"use server";

import { signIn } from "@acme/auth";

export const googleSignin = async () => {
  console.log(0);
  await signIn("google");
};
