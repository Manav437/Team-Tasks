// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Prisma singleton pattern for Next.js
let prisma;
if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user || !user.password) {
                    // Throw an error to show a message on the client
                    throw new Error("No user found. Please sign up first.");
                }
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Invalid credentials");
                }
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google" && profile && !profile.email_verified) {
                return false;
            }
            return true;
        },
        async session({ session, token, user }) {
            // Optionally add user id or other fields to session
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
