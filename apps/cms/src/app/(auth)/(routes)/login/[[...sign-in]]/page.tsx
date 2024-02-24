import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { AuthShowcase } from "../../components/auth-showcase";
import AuthWrapper from "../../components/auth-wrapper";

export const metadata: Metadata = {
  title: "Login | Physis Admin",
  description: "Physis login.",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <AuthWrapper
      title="Welkom bij Physis Admin!"
      description="Kies hoe je wilt inloggen"
    >
      <AuthShowcase />
    </AuthWrapper>
  );
}
