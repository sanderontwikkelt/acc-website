"use server";

import React from "react";
import Link from "next/link";

import { AuthShowcase } from "@acme/ui/auth-showcase";
import { Separator } from "@acme/ui/separator";
import { SignInForm } from "@acme/ui/sign-in-form";

const SignupPage = () => {
  return (
    <section className="dark:bg-dark bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full space-y-4 px-4 lg:w-1/2">
            <h2 className="text-dark mb-4 text-3xl font-bold !leading-[1.22] sm:text-[45px] dark:text-white">
              Inloggen
            </h2>
            <p className="text-body-color dark:text-dark-6 mb-8 max-w-[510px] text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              dui aliquet, pellentesque tellus ac, faucibus ex.
            </p>
            <SignInForm />
            <Separator />
            <div className="flex items-center space-x-4">
              <AuthShowcase />
              <span className="px-2">OF</span>
              <Link href="/sign-up" className="hover:text-primary">
                Aanmelden
              </Link>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="hidden text-center lg:block">
              <img
                src="https://cdn.tailgrids.com/2.0/image/application/images/forms/forms-10.svg"
                alt="illustration"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
