// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { getUserFromDb } from "./lib/db";
// import { bcyrpt } from "bcyrpt";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//       },
//       authorize: async (credentials) => {
//         let user = null;
//         const password = bcyrpt(credentials?.password || "", 10);
//         user = await getUserFromDb(credentials?.email || "", password);
//         if (!user) {
//           throw new Error("Invalid email or password");
//         }
//         return user;
//       },
//     }),
//   ],
// });
