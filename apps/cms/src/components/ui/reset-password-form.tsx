"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@acme/ui/toast";
import type {z} from "zod";

import { cn } from "~/lib/utils";
import { resetPasswordSchema } from "~/lib/validation/resetPasswordSchema";
import { buttonVariants } from "./button";
import { Input } from "./input";
import { Label } from "./label";

type FormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await axios.post("reset-password", {
        password: data.password,
        token,
      });

      toast.success(
        "Wachtwoord is succesvol aangepast. Log in met uw nieuwe wachtwoord!",
      );

      router.push("/sign-in");
    } catch (e) {
      toast.error("Aanvraag is verlopen.");
      console.log(e);
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
              Wachtwoord
            </Label>

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
            Wachtwoord resetten
          </button>
        </div>
      </form>
    </div>
  );
};
