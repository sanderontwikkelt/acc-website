import "./globals.css";

import type { Metadata, Viewport } from "next";
import { cache, Suspense } from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { SessionProvider } from "next-auth/react";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { Loader } from "~/components/ui/loader";
import { env } from "~/env";
import { ModalProvider } from "~/providers/modal-provider";
import { TRPCReactProvider } from "~/trpc/react";

process.env.NODE_NO_WARNINGS = "stream/web";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production" ? env.VERCEL_URL : "http://localhost:3000",
  ),
  title: "Physis Admin",
  description: "Physis Admin",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "dark" },
  ],
};

const getHeaders = cache(async () => headers());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={cn("scroll-smooth", inter.className)}>
      <body
        className={cn(
          inter.className,
          "text-main h-screen w-screen overflow-hidden bg-gray-100 dark:bg-opacity-[0.02]",
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <TRPCReactProvider headersPromise={getHeaders()}>
              <ModalProvider />
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                {children}
              </Suspense>
            </TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
