"use client";

import { useEffect, useState } from "react";
import { Role } from "@/types/role";
import { updateRole } from "@/services/role.service";

type Props = {
    role: Role;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditRoleModal({
      role,
      onClose,
      onUpdated,
  }: Props) {
    const [name, setName] = useState(role.name);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(role.name);
    }, [role]);

    const handleUpdate = async () => {
        if (!name.trim()) {
            alert("Role name is required");
            return;
        }

        try {
            setLoading(true);
            await updateRole(role._id, { name: name.trim() });
            onUpdated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-base-100 rounded shadow-lg w-full max-w-md p-5">
                <h2 className="text-lg font-semibold mb-4">
                    Edit Role
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        className="input input-sm input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button className="btn btn-sm" onClick={onClose}>
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
