import type { ReactNode } from "react";
import React from "react";

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
    <div className="container relative flex min-h-screen flex-col items-center justify-center px-5 lg:max-w-none lg:px-0">
      <div className="max-md:w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 rounded-lg border border-border bg-white p-6 shadow-lg sm:w-[24rem]">
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
