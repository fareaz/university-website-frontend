import api from "@/lib/axios";

export type GetMyNoticesParams = {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    isDeleted?: boolean;
};

export const getAdminNotices = async (params: {
    page: number;
    search?: string;
    isDeleted: boolean;
}) => {
    const res = await api.get("/notices", {
        params
    });

    return res.data;
};

export const getMyNotices = async (params: GetMyNoticesParams) => {
    const res = await api.get("/notices/my-notices", {
        params,
    });

    return res.data; // { data, pagination }
};

export const getNoticeCounts = async () => {
    const res = await api.get("/notices/counts");
    return res.data;
};

export const softDeleteNotice = async (id: string) => {
    return api.delete(`/notices/${id}`);
};

// single restore
export const restoreNotice = async (id: string) => {
    return api.patch("/notices/restore", {
        ids: [id],
    });
};

// bulk restore
export const bulkRestoreNotice = async (ids: string[]) => {
    return api.patch("/notices/restore", { ids });
};

export const permanentDeleteNotices = async (ids: string[]) => {
    return api.delete(`/notices/permanent`, {
        data: { ids }
    });
};
