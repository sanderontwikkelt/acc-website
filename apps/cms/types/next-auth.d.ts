import NextAuth, { DefaultSession } from "next-auth";

import { Permission } from "@acme/db";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      permissions: Permission[];
    } & DefaultSession["user"];
  }

  interface JWT {
    permissions?: Permission[];
  }
}
