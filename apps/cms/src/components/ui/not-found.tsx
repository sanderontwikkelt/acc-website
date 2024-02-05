import React from "react";
import Link from "next/link";

import { buttonVariants } from "@acme/ui";

const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Niet gevonden
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we hebben niet kunnen vinden waar je naar zocht.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className={buttonVariants()}>
            Terug naar home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
