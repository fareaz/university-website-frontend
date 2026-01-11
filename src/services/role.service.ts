import api from "@/lib/axios";
import { Role } from "@/types/role";
import Swal from "sweetalert2";

export const getRoles = async (params?: { search?: string }) => {
    const res = await api.get<Role[]>("/roles", { params });
    return res.data;
};

export const createRole = async (data: { name: string }) => {
    return api.post("/roles", data);
};

export const updateRole = async (
    id: string,
    data: { name: string }
) => {
    return api.patch(`/roles/${id}`, data);
};

export const deleteRole = async (id: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Role has been deleted.",
                icon: "success"
            });
            return api.delete(`/roles/${id}`);
        }
    });
};
