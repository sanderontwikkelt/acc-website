import type { ReactNode } from "react";
import React from "react";
import Image from "next/image";

const AuthWrapper = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center px-5 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full max-h-screen flex-col overflow-hidden bg-muted text-white lg:flex">
        <Image
          src="/images/login.jpg"
          width={510}
          height={852}
          alt="login hero"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
      </div>
      <div className="max-md:w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[24rem]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
