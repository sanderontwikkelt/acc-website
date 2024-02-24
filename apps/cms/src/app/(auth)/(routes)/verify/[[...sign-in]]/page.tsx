import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, InboxIcon } from "lucide-react";

import { auth } from "@acme/auth";
import { buttonVariants } from "@acme/ui";

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
      title="Een e-mail is verstuurd"
      description="Je kunt inloggen via de verstuurde verificatielink"
    >
      <Link className={buttonVariants({})} href="/login">
        <ArrowLeft className="mr-2 w-4" />
        Terug naar login
      </Link>
    </AuthWrapper>
  );
}
