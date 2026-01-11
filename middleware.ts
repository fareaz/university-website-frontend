import { withAuth } from "next-auth/middleware";
import type { UserRole } from "@/types/role";

const dashboardAllowedRoles: UserRole[] = ["admin", "teacher"];

export default withAuth({
    callbacks: {
        authorized({ token, req }) {
            if (req.nextUrl.pathname.startsWith("/dashboard")) {
                return dashboardAllowedRoles.includes(token?.role as UserRole);
            }
            return true;
        },
    },
});

export const config = {
    matcher: ["/dashboard/:path*"],
};
