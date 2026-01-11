"use client";

import { useEffect, useCallback, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CategoryForm from "@/components/dashboard/CategoryForm";
import EditCategoryModal from "@/components/dashboard/EditCategoryModal";
import { buildIndentedCategories } from "@/utils/categoryTree";
import {
    getCategories,
    deleteCategory,
} from "@/services/category.service";
import { Category } from "@/types/category";
import SectionLoader from "@/components/ui/SectionLoader";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingCategory, setEditingCategory] =
        useState<Category | null>(null);
    const indentedCategories = buildIndentedCategories(categories);

    const loadData = useCallback(async () => {
        const res = await getCategories();
        setCategories(res);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData().then();
    }, [loadData]);

    const toggleAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(categories.map(c => c._id));
        } else {
            setSelectedIds([]);
        }
    };

    const bulkDelete = async () => {
        if (!confirm("Delete selected categories?")) {
            return;
        }

        await Promise.all(selectedIds.map(id => deleteCategory(id)));
        loadData();
    };

    return (
        <>
            <DashboardLayout>
                <h1 className="text-2xl font-bold mb-10">Manage <span className="text-primary">Categories</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10">
                    {/* LEFT: Add category */}
                    <CategoryForm onCreated={loadData}/>

                    {/* RIGHT: Table */}
                    <div className="md:col-span-2">
                        {/* Top bar */}
                        <div className="flex justify-between mb-5">
                            <div className="flex gap-2">
                                <select
                                    className="select select-sm select-bordered"
                                    onChange={e => {
                                        if (e.target.value === "delete") bulkDelete();
                                    }}
                                >
                                    <option>Bulk actions</option>
                                    <option value="delete">Delete</option>
                                </select>

                                <button className="btn btn-sm btn-warning">Apply</button>
                            </div>

                            <input
                                type="text"
                                placeholder="Search categories"
                                className="input input-sm input-bordered"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                      {/* TABLE WRAPPER */}
<div className="bg-base-100 shadow-2xl rounded-2xl">

  {/* ========= DESKTOP / TABLET TABLE ========= */}
  <div className="overflow-x-auto hidden md:block">
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Parent</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {indentedCategories.map(cat => (
          <tr key={cat._id}>
            <td>
              <input
                type="checkbox"
                checked={selectedIds.includes(cat._id)}
                onChange={(e) => {
                  if (e.target.checked)
                    setSelectedIds(p => [...p, cat._id]);
                  else
                    setSelectedIds(p => p.filter(id => id !== cat._id));
                }}
              />
            </td>

            <td>
              <span
                className="font-medium"
                style={{ paddingLeft: `${(cat as any)._depth * 16}px` }}
              >
                {(cat as any)._depth > 0 && "— ".repeat((cat as any)._depth)}
                {cat.name}
              </span>
            </td>

            <td>{cat?.parent?.name || "-"}</td>

            <td className="flex flex-wrap gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setEditingCategory(cat)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-error"
                onClick={() => deleteCategory(cat._id).then(loadData)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* ========= MOBILE CARD VIEW ========= */}
  <div className="md:hidden space-y-3 p-2">
    {indentedCategories.map((cat, index) => (
      <div
        key={cat._id}
        className="border border-gray-100 shadow-md  rounded-xl p-3 bg-base-200 space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold">
            {(cat as any)._depth > 0 && "— ".repeat((cat as any)._depth)}
            {cat.name}
          </span>

          <input
            type="checkbox"
            checked={selectedIds.includes(cat._id)}
            onChange={(e) => {
              if (e.target.checked)
                setSelectedIds(p => [...p, cat._id]);
              else
                setSelectedIds(p => p.filter(id => id !== cat._id));
            }}
          />
        </div>

        <p className="text-sm">
          <span className="font-semibold">Parent:</span>{" "}
          {cat?.parent?.name || "None"}
        </p>

        <div className="flex gap-2 mt-2">
          <button
            className="btn btn-sm btn-primary flex-1 "
            onClick={() => setEditingCategory(cat)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-error flex-1 "
            onClick={() => deleteCategory(cat._id).then(loadData)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


                        {categories.length === 0 && (
                            <div className="text-center text-gray-500 py-6">
                                No categories found
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>

            {editingCategory && (
                <EditCategoryModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onUpdated={loadData}
                />
            )}
        </>
    );
}
