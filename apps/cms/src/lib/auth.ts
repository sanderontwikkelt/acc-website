// import { compare } from "bcrypt";
// import CredentialsProvider from "next-auth/providers/credentials";

// import { db, eq, schema } from "@acme/db";

// const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60; // Two days in seconds.

// const getPermissions = async (email: string) => {
//   const user = await db.query.user.findFirst({
//     where: eq(schema.user.email, email),
//     with: {
//       roles: {
//         with: {
//           permissions: true,
//         },
//       },
//     },
//   });

//   return user?.roles.flatMap((role) => role.permissions) || [];
// };

// const getUserWithPermissions = async (email: string) => {
//   return db.query.user.findFirst({
//     where: eq(schema.user.email, email),
//     with: {
//       role: {
//         with: {
//           permissions: true,
//         },
//       },
//     },
//   });
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         if (!credentials) return Promise.resolve(null);
//         const user = await getUserWithPermissions(credentials.email);

//         if (!user) {
//           return Promise.resolve(null);
//         }

//         // Compare the provided password with the stored hashed password using bcrypt
//         const isValid = await compare(credentials.password, user.password);

//         if (!isValid) {
//           return Promise.resolve(null);
//         }

//         return Promise.resolve(user);
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: SEVEN_DAYS_IN_SECONDS,
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//     maxAge: SEVEN_DAYS_IN_SECONDS,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }

//       if (token.email) {
//         const userWithPermissions = await getUserWithPermissions(
//           token.email as string,
//         );
//         if (userWithPermissions) {
//           token.id = userWithPermissions.id;
//           token.permissions =
//             userWithPermissions.roles.flatMap((role) => role.permissions) || [];
//         }
//       }
//       return token;
//     },
//     async session({ session, user }) {
//       if (user) {
//         session.user.id = user.id;
//       }
//       if (session.user?.email) {
//         session.user.permissions = await getPermissions(
//           session.user.email as string,
//         );
//       }
//       if (session.user?.email) {
//         const userWithPermissions = await getUserWithPermissions(
//           session.user.email as string,
//         );
//         if (userWithPermissions) {
//           session.user.id = userWithPermissions.id;
//           session.user.permissions =
//             userWithPermissions.roles.flatMap((role) => role.permissions) || [];
//         }
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/sign-in",
//   },
// };
