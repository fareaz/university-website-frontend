"use client";

import { useEffect, useRef, useState } from "react";
import { buildIndentedCategories } from "@/utils/categoryTree";
import api from "@/lib/axios";
import { Category } from "@/types/category";
import Swal from "sweetalert2";
import SectionLoader from "@/components/ui/SectionLoader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type Role = {
    _id: string;
    name: string;
};

export default function UploadNoticeForm() {
    /* ================= STATE ================= */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [catRes, roleRes] = await Promise.all([
                    api.get("/categories"),
                    api.get("/roles"),
                ]);

                setCategories(catRes.data);
                setRoles(roleRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indentedCategories = buildIndentedCategories(categories);

    /* ================= GENERAL CATEGORY LOGIC ================= */
    const generalCategoryId = categories.find(
        (c) => c.name === "General"
    )?._id;

    const isGeneralSelected = !!(
        generalCategoryId &&
        selectedCategories.includes(generalCategoryId)
    );

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title) {
            await Swal.fire("Error", "Title required", "error");
            return;
        }
        if (!file) {
            await Swal.fire("Error", "File required", "error");
            return;
        }
        if (selectedCategories.length === 0) {
            await Swal.fire("Error", "Category required", "error");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("file", file);

            // categories → ObjectId
            selectedCategories.forEach((id) =>
                formData.append("categories", id)
            );

            // roles → ObjectId (only if General not selected)
            if (!isGeneralSelected) {
                selectedRoles.forEach((id) =>
                    formData.append("allowedRoles", id)
                );
            }

            await api.post("/notices", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Notice uploaded successfully",
                showConfirmButton: false,
                timer: 1500
            });

            // reset
            setTitle("");
            setDescription("");
            setFile(null);
            setSelectedCategories([]);
            setSelectedRoles([]);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (error: any) {
            await Swal.fire(
                "Error",
                error?.response?.data?.message || "Upload failed",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <>
            <h1 className="text-2xl font-bold mb-10">Upload <span className="text-primary">Notice</span></h1>
            <SectionLoader />
        </>;
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
            {/* ================= LEFT / MAIN ================= */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold mb-10">Upload <span className="text-primary">Notice</span></h1>

                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-4">
                        <h2 className="text-lg font-semibold">
                            Notice Details
                        </h2>

                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Notice title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={6}
                            placeholder="Notice description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="btn btn-primary w-full mt-5"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Publish Notice"}
                </button>
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
            <div className="space-y-4">
                {/* FILE */}
                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-3">
                        <h2 className="font-semibold">Attach File</h2>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            className="file-input file-input-bordered w-full"
                        />

                        <p className="text-xs text-gray-500">
                            Allowed: Image (.jpg,.jpeg,.png)
                        </p>
                    </div>
                </div>

                {/* CATEGORIES */}
                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-2">
                        <h2 className="font-semibold">Categories</h2>

                        <div className="max-h-52 overflow-y-auto space-y-2">
                            {indentedCategories.map((cat) => (
                                <label
                                    key={cat._id}
                                    className="flex items-start gap-2 text-sm"
                                    style={{
                                        paddingLeft: `${cat._depth * 16}px`,
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mt-0.5"
                                        checked={selectedCategories.includes(cat._id)}
                                        onChange={() =>
                                            setSelectedCategories((prev) =>
                                                prev.includes(cat._id)
                                                    ? prev.filter((id) => id !== cat._id)
                                                    : [...prev, cat._id]
                                            )
                                        }
                                    />

                                    <span>
                                        {cat._depth > 0 && (
                                            <span className="opacity-70">
                                                {"— ".repeat(cat._depth)}
                                            </span>
                                        )}
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ROLES */}
                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-2">
                        <h2 className="font-semibold">Allowed Roles</h2>

                        {isGeneralSelected && (
                            <p className="text-xs text-warning">
                                General category selected → roles disabled
                            </p>
                        )}

                        <div className="space-y-2">
                            {roles.map((role) => (
                                <label
                                    key={role._id}
                                    className="flex items-center gap-2 text-sm capitalize"
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm"
                                        disabled={isGeneralSelected}
                                        checked={selectedRoles.includes(
                                            role._id
                                        )}
                                        onChange={() =>
                                            setSelectedRoles((prev) =>
                                                prev.includes(role._id)
                                                    ? prev.filter(
                                                        (id) =>
                                                            id !== role._id
                                                    )
                                                    : [...prev, role._id]
                                            )
                                        }
                                    />
                                    {role.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
