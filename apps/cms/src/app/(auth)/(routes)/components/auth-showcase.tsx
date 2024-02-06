import { redirect } from "next/navigation";

import { auth, signIn } from "@acme/auth";
import { Button } from "@acme/ui/button";

export async function AuthShowcase() {
  const session = await auth();

  if (session) redirect("/");

  return (
    <form>
      <Button
        size="lg"
        formAction={async () => {
          "use server";
          await signIn("google");
        }}
      >
        Sign in with Google
      </Button>
    </form>
  );
}
