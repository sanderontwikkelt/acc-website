import { type Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { ForgotPasswordForm } from "@/components/ui/forgot-password-form"
import { ResetPasswordForm } from "@/components/ui/reset-password-form"
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
      title="Wachtwoord resetten"
      description="Vul je nieuwe wachtwoord in om te resetten."
    >
      <ResetPasswordForm />
    </AuthWrapper>
  )
}
