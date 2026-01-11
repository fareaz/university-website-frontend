"use client";

import { useSession } from "next-auth/react";

export default function Protected({
                                      children,
                                  }: {
    children: React.ReactNode;
}) {
    const { status } = useSession();

    if (status === "loading") {
        return <p className="p-6">Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p className="p-6">Access denied. Please login.</p>;
    }

    return <>{children}</>;
}
