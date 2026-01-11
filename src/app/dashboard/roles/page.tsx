"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RoleForm from "@/components/dashboard/RoleForm";
import EditRoleModal from "@/components/dashboard/EditRoleModal";
import { getRoles, deleteRole } from "@/services/role.service";
import { Role } from "@/types/role";

export default function AdminRolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const loadData = useCallback(async () => {
        const res = await getRoles({ search });
        setRoles(res);
        setSelectedIds([]);
    }, [search]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const toggleAll = (checked: boolean) => {
        setSelectedIds(checked ? roles.map(r => r._id) : []);
    };

    const bulkDelete = async () => {
        if (!confirm("Delete selected roles?")) return;
        await Promise.all(selectedIds.map(id => deleteRole(id)));
        loadData();
    };

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-10">Roles</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10">
                {/* LEFT */}
                <RoleForm onCreated={loadData} />

                {/* RIGHT */}
                <div className="md:col-span-2">
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
                            placeholder="Search role"
                            className="input input-sm input-bordered"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="overflow-x-auto bg-base-100 shadow-2xl rounded-2xl">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={
                                                roles.length > 0 &&
                                                selectedIds.length === roles.length
                                            }
                                            onChange={e => toggleAll(e.target.checked)}
                                        />
                                    </th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                            {roles.map(role => (
                                <tr key={role._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(role._id)}
                                            onChange={e =>
                                                setSelectedIds(prev =>
                                                    e.target.checked
                                                        ? [...prev, role._id]
                                                        : prev.filter(id => id !== role._id)
                                                )
                                            }
                                        />
                                    </td>

                                    <td>
                                        <p className="capitalize font-medium">{role.name}</p>
                                    </td>
                                    <td className="flex items-center gap-5">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => setEditingRole(role)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() =>
                                                deleteRole(role._id).then(loadData)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {roles.length === 0 && (
                        <div className="text-center text-gray-500 py-6">
                            No roles found
                        </div>
                    )}
                </div>

                {editingRole && (
                    <EditRoleModal
                        role={editingRole}
                        onClose={() => setEditingRole(null)}
                        onUpdated={loadData}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
