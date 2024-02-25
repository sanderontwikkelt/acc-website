import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { auth } from "@acme/auth";
import { buttonVariants } from "@acme/ui";

import CloseWindowButton from "~/app/_components/close-window-button";
import AuthWrapper from "../../components/auth-wrapper";

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
      <div className="flex flex-col space-y-2">
        <CloseWindowButton />
        <Link className={buttonVariants({ variant: "link" })} href="/login">
          <ArrowLeft className="mr-2 w-4" />
          Terug naar login
        </Link>
      </div>
    </AuthWrapper>
  );
}
