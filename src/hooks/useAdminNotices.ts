"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminNotices } from "@/services/adminNotice.service";

export const useAdminNotices = ({
    page,
    search,
    isDeleted,
}: {
    page: number;
    search?: string;
    isDeleted: boolean;
}) => {
    return useQuery({
        queryKey: ["admin-notices", page, search, isDeleted],
        queryFn: () =>
            getAdminNotices({
                page,
                search,
                isDeleted,
            }),
        placeholderData: (prev) => prev,
    });
};
