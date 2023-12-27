import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { UserAuthForm } from "@/components/ui/user-auth-form"

import AuthWrapper from "../../components/auth-wrapper"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default async function AuthenticationPage() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    return redirect("/")
  }

  return (
    <AuthWrapper
      title="Welkom bij Physis Admin"
      description="Vul je gegevens in om in te loggen."
    >
      <UserAuthForm />
    </AuthWrapper>
  )
}
