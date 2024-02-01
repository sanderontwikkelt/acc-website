"use server";

import React from "react";

import { signIn } from "@acme/auth";

import { Button } from "./button";

const GoogleSignInButton = () => {
  return (
    <Button
      size="lg"
      formAction={async () => {
        await signIn("google");
      }}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
