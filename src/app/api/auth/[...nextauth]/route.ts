import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth handler
 * GET  -> used internally by NextAuth (session, providers, csrf, etc.)
 * POST -> used for login (credentials callback)
 */
const handler = NextAuth(authOptions);

// App Router requires named exports
export { handler as GET, handler as POST };
