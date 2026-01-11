"use client";

import { useEffect, useState } from "react";
import { createCategory, getCategories } from "@/services/category.service";
import { Category } from "@/types/category";
import { buildIndentedCategories } from "@/utils/categoryTree";

type Props = {
    onCreated?: () => void;
};

export default function CategoryForm({ onCreated }: Props) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // load categories for parent dropdown
    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const indentedCategories = buildIndentedCategories(categories);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Category name is required");
            return;
        }

        try {
            setLoading(true);

            await createCategory({
                name: name.trim(),
                parent: parent || null,
            });

            // reset form
            setName("");
            setParent(null);

            // 🔥 notify parent page to reload table
            if (onCreated) {
                onCreated();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-2xl rounded-2xl">
            <div className="card-body">
                <h2 className="font-semibold mb-4">Add New Category</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="input input-sm input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category name"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            The name is how it appears on your site.
                        </p>
                    </div>

                    {/* Parent */}
                    <div>
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
                            {indentedCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {(cat as any)._depth > 0 && "— ".repeat((cat as any)._depth)}
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Categories can have a hierarchy.
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Category"}
                    </button>
                </form>
            </div>
        </div>
    );
}
