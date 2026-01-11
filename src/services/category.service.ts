import api from "@/lib/axios";
import Swal from "sweetalert2";

export const getCategories = async () => {
    const res = await api.get("/categories");
    return res.data;
};

export const createCategory = async (data: {
    name: string;
    parent?: string | null;
}) => {
    try {
        return api.post("/categories", data);
    } catch (error) {
        console.log(error);
    }
};

export const updateCategory = async (
    id: string,
    data: {
        name: string;
        parent?: string | null
    }
) => {
    // return api.patch(`/categories/${id}`, data);
    const res = await api.patch(`/categories/${id}`, data);
    return res.data;
};

export const deleteCategory = async (id: string) => {
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
                text: "Category has been deleted.",
                icon: "success",
            });
            return api.delete(`/categories/${id}`);
        }
    });
};
