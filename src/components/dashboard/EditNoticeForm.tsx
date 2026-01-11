"use client";

import { useEffect, useRef, useState } from "react";
import { buildIndentedCategories } from "@/utils/categoryTree";
import api from "@/lib/axios";
import { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import SectionLoader from "@/components/ui/SectionLoader";

type Role = {
    _id: string;
    name: string;
};

type Props = {
    noticeId: string;
};

export default function EditNoticeForm({ noticeId }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    /* ================= LOAD NOTICE + META ================= */
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [noticeRes, catRes, roleRes] = await Promise.all([
                    api.get(`/notices/${noticeId}`),
                    api.get("/categories"),
                    api.get("/roles"),
                ]);

                const notice = noticeRes.data;

                setTitle(notice.title);
                setDescription(notice.description || "");
                setSelectedCategories(
                    notice.categories.map((c: Category) => c._id)
                );
                setSelectedRoles(
                    notice.allowedRoles?.map((r: Role) => r._id) || []
                );

                setCategories(catRes.data);
                setRoles(roleRes.data);
            } catch (error) {
                console.log(error)
                await Swal.fire("Error", "Failed to load notice", "error");
            }
        };

        fetchAll();
    }, [noticeId]);

    const indentedCategories = buildIndentedCategories(categories);

    const generalCategoryId = categories.find(
        (c) => c.name === "General"
    )?._id;

    const isGeneralSelected = !!(
        generalCategoryId &&
        selectedCategories.includes(generalCategoryId)
    );

    /* ================= UPDATE ================= */
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title) {
            await Swal.fire("Error", "Title required", "error");
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

            if (file) {
                formData.append("file", file);
            }

            selectedCategories.forEach((id) =>
                formData.append("categories", id)
            );

            if (!isGeneralSelected) {
                selectedRoles.forEach((id) =>
                    formData.append("allowedRoles", id)
                );
            }

            await api.patch(`/notices/${noticeId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await Swal.fire({
                icon: "success",
                title: "Notice updated successfully",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/dashboard/notices");
        } catch (error: any) {
            await Swal.fire(
                "Error",
                error?.response?.data?.message || "Update failed",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!title || !selectedCategories) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-10">Edit Notice</h1>

                <SectionLoader />
            </div>
        );
    }

    /* ================= UI ================= */
    return (
        <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold mb-10">Edit Notice</h1>

                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-4">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full mt-5"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Notice"}
                </button>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
                {/* FILE */}
                <div className="card bg-base-100 shadow-2xl rounded-2xl">
                    <div className="card-body space-y-3">
                        <h2 className="font-semibold">Replace File (optional)</h2>
                        <input
                            ref={fileInputRef}
                            type="file"
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
                                    style={{ paddingLeft: `${cat._depth * 16}px` }}
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm mt-0.5"
                                        checked={selectedCategories.includes(
                                            cat._id
                                        )}
                                        onChange={() =>
                                            setSelectedCategories((prev) =>
                                                prev.includes(cat._id)
                                                    ? prev.filter(
                                                        (id) => id !== cat._id
                                                    )
                                                    : [...prev, cat._id]
                                            )
                                        }
                                    />
                                    <span>
                                        {cat._depth > 0 &&
                                            "— ".repeat(cat._depth)}
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

                        {roles.map((role) => (
                            <label
                                key={role._id}
                                className="flex items-center gap-2 text-sm capitalize"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    disabled={isGeneralSelected}
                                    checked={selectedRoles.includes(role._id)}
                                    onChange={() =>
                                        setSelectedRoles((prev) =>
                                            prev.includes(role._id)
                                                ? prev.filter(
                                                    (id) => id !== role._id
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
        </form>
    );
}