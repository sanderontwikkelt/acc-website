"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";

import { cn } from "~/lib/utils";
import { forgotPasswordSchema } from "~/lib/validation/forgotPasswordSchema";
import { buttonVariants } from "./button";
import { Input } from "./input";
import { Label } from "./label";

type FormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await axios.post("/api/forgot-password", {
        email: data.email.toLowerCase(),
      });

      return toast.success(
        "We hebben een link gestuurd om uw wachtwoord te resetten.",
      );
    } catch (e) {
      toast.error(
        "Er is iets fout gegaan. Zorg ervoor dat je een geldig en bestaand e-mail invult.",
      );
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
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Nieuw wachtwoord aanvragen
          </button>
        </div>
      </form>
    </div>
  );
};
