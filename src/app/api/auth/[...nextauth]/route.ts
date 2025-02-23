import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV !== "production",
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect() {
      return "/";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
