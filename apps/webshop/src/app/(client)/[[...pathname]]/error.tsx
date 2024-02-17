"use client";

import { Button } from "~/components/button";

export default function Error() {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pagina niet gevonden
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we hebben deze pagina niet kunnen vinden.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button href="/">Terug naar home</Button>
            <Button href="/contact" variant="accent" withArrow>
              Neem contact op
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
