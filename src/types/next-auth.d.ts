import type { UserRole } from "./role";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: UserRole;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
        accessToken?: string;
    }
}
