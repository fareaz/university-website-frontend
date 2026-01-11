import api from "@/lib/axios";

type Props = {
    page?: number;
    limit?: number;
    action?: string;
    admin?: string;
    targetType?: string;
    from?: string;
    to?: string;
}

export const getAuditLogs = async (params: Props) => {
    const res = await api.get("/audit-logs", { params });
    return res.data;
};
