import type { DefaultSession, NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { v4 as uuidv4 } from "uuid";

// import EmailProvider from "next-auth/providers/email";

import type { Permission } from "@acme/db";
import { and, db, eq, schema, tableCreator } from "@acme/db";

import { env } from "../env";

export type { Session } from "next-auth";

interface User {
  id: string;
  permissions: Permission[];
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
      console.log({ results });
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
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: +process.env.EMAIL_SERVER_PORT!,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM,
    //   // sendVerificationRequest({
    //   //   identifier: email,
    //   //   url,
    //   //   provider: { server, from },
    //   // }) {
    //   //   console.log({email, url, server, from})
    //   // },
    // }),
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
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
