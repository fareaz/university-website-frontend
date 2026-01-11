"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import {
    updateCategory,
    getCategories,
} from "@/services/category.service";
import { buildIndentedCategories } from "@/utils/categoryTree";

type Props = {
    category: Category | null;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditCategoryModal({
      category,
      onClose,
      onUpdated,
  }: Props) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // load categories for parent dropdown
    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const indentedCategories = buildIndentedCategories(categories);

    // fill form when category changes
    useEffect(() => {
        if (category) {
            setName(category.name);
            setParent(category.parent?._id ?? null);
        }
    }, [category]);

    if (!category) return null;

    const handleUpdate = async () => {
        if (!name.trim()) {
            alert("Category name is required");
            return;
        }

        try {
            setLoading(true);

            await updateCategory(category._id, {
                name: name.trim(),
                parent: parent || null,
            });

            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-base-100 rounded shadow-lg w-full max-w-md p-5">
                <h2 className="text-lg font-semibold mb-4">
                    Edit Category
                </h2>

                {/* Name */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        className="input input-sm input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Parent */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Parent Category
                    </label>
                    <select
                        className="select select-sm select-bordered w-full"
                        value={parent ?? ""}
                        onChange={(e) =>
                            setParent(e.target.value || null)
                        }
                    >
                        <option value="">None</option>
                        {indentedCategories
                            .filter(c => c._id !== category._id)
                            .map((c: any) => (
                                <option key={c._id} value={c._id}>
                                    {(c._depth > 0 ? "— ".repeat(c._depth) : "")}
                                    {c.name}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <button
                        className="btn btn-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-sm btn-primary"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}
