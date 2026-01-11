import { useQuery } from "@tanstack/react-query";
import { getNotices } from "@/services/notice.service";
import type { NoticesResponse } from "@/types/notice";

export const useNotices = (page: number) => {
    return useQuery<NoticesResponse>({
        queryKey: ["notices", page],
        queryFn: () => getNotices(page),
        placeholderData: (prev) => prev,
    });
};
