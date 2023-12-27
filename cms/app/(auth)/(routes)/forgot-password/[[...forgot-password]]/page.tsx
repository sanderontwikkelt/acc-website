import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { ForgotPasswordForm } from "@/components/ui/forgot-password-form"

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
      title="Wachtwoord vergeten"
      description="Vul je e-mail in om je wachtwoord te resetten."
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  )
}
