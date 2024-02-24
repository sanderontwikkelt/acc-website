import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { auth } from "@acme/auth";
import { Button, buttonVariants } from "@acme/ui";

import AuthWrapper from "../../components/auth-wrapper";
import CloseWindowButton from "~/app/_components/close-window-button";

export const metadata: Metadata = {
  title: "Verificatie | Physis Admin",
  description: "Physis verificatie.",
};

export default async function AuthenticationPage() {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <AuthWrapper
      title="Een e-mail is verstuurd"
      description="Log in via de verstuurde verificatielink. Je kunt dit venster sluiten."
    >
      <div className="space-y-2 flex flex-col">

      <CloseWindowButton />
      <Link className={buttonVariants({ variant: 'link'})} href="/login">
        <ArrowLeft className="mr-2 w-4" />
        Terug naar login
      </Link>
      </div>
    </AuthWrapper>
  );
}
