import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./lib/user";
import { loginSchema } from "./types/custom";

export default {
  providers: [
    Credentials({
      authorize: async (creds) => {
        const validated = loginSchema.safeParse(creds);
        if (!validated.success) throw new Error("Invalid credentials");
        const { email, password } = validated.data;
        const user = await getUserByEmail(email);
        if (!user) throw new Error("User not found");
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) throw new Error("Invalid password");
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
