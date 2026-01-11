import api from "@/lib/axios";

export const getAdminDashboard = async (days = 7) => {
    const res = await api.get("/admin/dashboard", {
        params: { days }
    });
    return res.data;
};
