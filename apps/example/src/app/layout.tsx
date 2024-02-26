import "./globals.css";

import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "./(client)/components/footer";
import Header from "./(client)/components/header";
import GoogleAnalytics from "./GoogleAnalytics";
import { RouteChangeListener } from "./route-change-listener";

process.env.NODE_NO_WARNINGS = "stream/web";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title:
    "webshop: Op Maat Gemaakte Sportsokken met Eigen Logo - Personaliseer Jouw Stijl",
  description:
    "Ontdek unieke, op maat gemaakte sportsokken met jouw eigen logo bij [Webshop Naam]. Perfect voor teams, clubs, of individuele sporters. Hoogwaardige kwaliteit, comfortabele pasvorm, en snelle levering. Laat jouw sportstijl zien en maak een statement op het veld. Bestel nu en ervaar het verschil!",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const getHeaders = cache(async () => headers());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <RouteChangeListener />
      <body
        className={cn(
          inter.className,
          "text-main w-full overflow-x-hidden bg-white",
        )}
      >
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TRPCReactProvider headersPromise={getHeaders()}>
            <Header />
            <div className="pt-[5rem] md:pt-[7.5rem]">{children}</div>
            <Footer />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
