import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";
import { SignInForm } from "@acme/ui/sign-in-form";

import { AuthShowcase } from "../../components/auth-showcase";
import AuthWrapper from "../../components/auth-wrapper";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <AuthWrapper
      title="Welkom bij Sockwave Admin"
      description="Vul je gegevens in om in te loggen."
    >
      <SignInForm />
      <AuthShowcase />
    </AuthWrapper>
  );
}
