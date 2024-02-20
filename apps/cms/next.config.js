// Importing env files here to validate on build
import "./src/env.js";
import "@acme/auth/env";

/** @type {import("next").NextConfig} */
const config = {
  optimizeFonts: false,
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/validators",
  ],
  images: {
    remotePatterns: [
      { hostname: "storage.googleapis.com" },
      { hostname: "storage.cloud.google.com" },
    ],
  },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
