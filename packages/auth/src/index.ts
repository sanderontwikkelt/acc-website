import type { DefaultSession, NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

import type { Permission } from "@acme/db";
import { and, db, eq, schema, tableCreator } from "@acme/db";

import { env } from "../env";

export type { Session } from "next-auth";

interface User {
  id: string;
  permissions: Permission[];
  email: string;
  emailVerified: Date;
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface JWT {
    user: { id: string };
  }
}

const authConfig = {
  adapter: {
    ...DrizzleAdapter(db, tableCreator),
    async getUserByAccount(providerAccountId) {
      const [results] = await db
        .select()
        .from(schema.account)
        .leftJoin(schema.user, eq(schema.user.id, schema.account.userId))
        .where(
          and(
            eq(schema.account.provider, providerAccountId.provider),
            eq(schema.user.isAdmin, true),
            eq(
              schema.account.providerAccountId,
              providerAccountId.providerAccountId,
            ),
          ),
        );

      return results?.user ?? null;
    },
    // async createUser(providerAccountId) {
    //   // const results = await db
    //   //   .select()
    //   //   .from(schema.account)
    //   //   .leftJoin(schema.user, eq(schema.user.id, schema.account.userId))
    //   //   .where(
    //   //     and(
    //   //       eq(schema.account.provider, providerAccountId.provider),
    //   //       eq(schema.account.providerAccountId, providerAccountId.providerAccountId),
    //   //     ),
    //   //   );

    //   // return results?.user ?? null;
    // }
  },

  secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    {
      id: "email",
      type: "email",
      name: "email",
      from: "",
      maxAge: 100000,
      options: {},
      async sendVerificationRequest({ identifier: email, url }) {
        // Call the cloud Email provider API for sending emails
        // See https://docs.sendgrid.com/api-reference/mail-send/mail-send

        console.log('vercel url: ', process.env.VERCEL_URL)
        const response = await fetch(
          `${process.env.VERCEL_URL!}/api/email`,
          {
            // The body format will vary depending on provider, please see their documentation
            // for further details.
            body: JSON.stringify({
              url,
              email,
            }),
            headers: {
              // Authentication will also vary from provider to provider, please see their docs.
              Authorization: `Bearer ${process.env.SENDGRID_API}`,
              "Content-Type": "application/json",
            },
            method: "POST",
          },
        );

        if (!response.ok) {
          const { errors } = await response.json();
          throw new Error(JSON.stringify(errors));
        }
      },
    },
    CredentialsProvider({
      name: "anonymous",
      credentials: {},
      async authorize() {
        const user = {
          id: uuidv4(),
          anonymous: true,
          email: "",
          name: "Anoniem",
        };
        await db.insert(schema.user).values(user);
        return {
          ...user,
          image: "",
          provider: "anonymous",
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      if (token?.user && session) session.user = token.user as User;

      const userId = session?.user?.id || user?.id;

      if (userId) {
        const userWithPermissions = await db.query.user.findFirst({
          where: eq(schema.user.id, userId),
          with: {
            role: {
              with: {
                permissions: {
                  with: {
                    permission: true,
                  },
                },
              },
            },
          },
        });
        const permissions =
          userWithPermissions?.role?.permissions.map(
            ({ permission }) => permission,
          ) || [];
        // if (!permissions) return { session: null }
        session.user.permissions = permissions;
      }

      return session;
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
