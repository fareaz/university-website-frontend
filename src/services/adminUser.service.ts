import api from "@/lib/axios";

export const getUsers = async (params: {
    page: number;
    search?: string;
}) => {
    const res = await api.get("/users", { params });
    return res.data;
};

export const updateUserRole = (userId: string, roleId: string) => {
    return api.patch(`/users/${userId}/role`, {
        roleId,
    });
};

export const deleteUser = async (id: string) => {
    return api.delete(`/users/${id}`);
};