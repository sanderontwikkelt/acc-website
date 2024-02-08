"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { toast } from "@acme/ui/toast";

import { cn } from "~/lib/utils";
import { userAuthSchema } from "~/lib/validation/userAuthSchema";
import { buttonVariants } from "./button";
import { Input } from "./input";
import { Label } from "./label";

type FormData = z.infer<typeof userAuthSchema>;

export const UserAuthForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const signInResult = await signIn("credentials", {
        email: data.email.toLowerCase(),
        password: data.password,
        redirect: false,
      });

      if (signInResult && signInResult.status === 401) {
        return toast.error(
          "Gebruiker niet gevonden. Probeer het opnieuw of vraag een nieuw wachtwoord aan.",
        );
      }

      if (signInResult && signInResult.status === 500) {
        return toast.error("Er is iets mis gegaan.");
      }

      return router.push("/");
    } catch (e) {
      console.log(e);
      toast.error("Er is iets mis gegaan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 pb-2 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
            <Input
              id="password"
              type="password"
              placeholder="***********"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 pb-2 text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Inloggen
          </button>
          <Link
            href="/forgot-password"
            className="block text-sm hover:underline"
          >
            Wachtwoord vergeten?
          </Link>
        </div>
      </form>
    </div>
  );
};
