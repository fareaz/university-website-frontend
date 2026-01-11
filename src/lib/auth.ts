import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { UserRole } from "@/types/role";

/**
 * NextAuth configuration
 * This is the single source of truth for auth config
 */
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    }
                );

                if (!res.ok) {
                    return null;
                }

                const data = await res.json();

                /**
                 * ⚠️ IMPORTANT
                 * NextAuth requires a flat object with `id`
                 */
                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role as UserRole,
                    accessToken: data.token,
                };
            },
        }),
    ],

    callbacks: {
        /**
         * Runs on JWT create/update
         */
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },

        /**
         * Expose values to client session
         */
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                role: token.role as UserRole,
                name: session.user?.name,
                email: session.user?.email,
            };

            (session as any).accessToken = token.accessToken;
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};
