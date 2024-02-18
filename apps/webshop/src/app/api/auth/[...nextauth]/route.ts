import type { DefaultSession, NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"

import type { Permission } from "@acme/db";
import { and, db, eq, schema, tableCreator } from "@acme/db";
import { env } from "@acme/auth/env";


export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      permissions: Permission[];
    } & DefaultSession["user"];
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
            eq(
              schema.account.providerAccountId,
              providerAccountId.providerAccountId,
            ),
          ),
        );

      return results?.user ?? null;
    },
    // async createUser(providerAccountId) {
    //   console.log(234, {providerAccountId})
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
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "anonymous",
      credentials: {},
      async authorize() {
          const user = {
            anonymous: true,
            email: '',
            name: 'Anoniem',
          }
          const {insertId: id} = await db.insert(schema.user).values(user)
          return {
            ...user, 
            id,
            image: "",
            provider: "anonymous"
          };
      },
  }),
  ],
  // callbacks: {
  //   session: async ({ session, user: { id: userId } }) => {
  //     console.log({session})
  //     const userWithPermissions = await db.query.user.findFirst({
  //       where: eq(schema.user.id, userId),
  //       with: {
  //         role: {
  //           with: {
  //             permissions: {
  //               with: {
  //                 permission: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     const permissions = userWithPermissions?.role?.permissions.map(
  //       ({ permission }) => permission,
  //     );
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: userId,
  //         permissions,
  //       },
  //     };
  //   },
  //   // authorized(params) {
  //   //   console.log({params})
  //   //   return !!params.auth?.user;
  //   // },
  // },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);


export const runtime = "edge";
