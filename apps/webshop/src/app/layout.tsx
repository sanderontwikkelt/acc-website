import "./globals.css";

import type { Metadata } from "next";
import { cache, Suspense } from "react";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { headers } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "src/trpc/react";

import { cn } from "@acme/ui";

import { AnonymousSessionProvider } from "./components/anonymous-session-provider";
import GoogleAnalytics from "./GoogleAnalytics";
import { WEB_URL } from "./lib/constants";
import { RouteChangeListener } from "./route-change-listener";

const getHeaders = cache(async () => headers());

process.env.NODE_NO_WARNINGS = "stream/web";

const inter = Inter({ subsets: ["latin"], variable: "--font-primary" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL),
  title: "Home - Accuraat Verhuur",
  description:
    "Wij helpen behandelaars en trainers om nog meer impact te maken op de vitaliteit van hun klanten. Elke week waardevolle kennis in je mail? Ontvang gratis kennis! Wat we doen Wij bieden jou een breed cursusaanbod op de gebieden Accuraat, Coaching en Ondernemen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          playfair.variable,
          inter.variable,
          poppins.variable,
          "text-main w-full overflow-x-hidden bg-white",
        )}
      >
        <Suspense>
          <RouteChangeListener />
        </Suspense>
        <GoogleAnalytics />
        <SessionProvider>
          <AnonymousSessionProvider>
            <TRPCReactProvider headersPromise={getHeaders()}>
              {children}
            </TRPCReactProvider>
          </AnonymousSessionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
