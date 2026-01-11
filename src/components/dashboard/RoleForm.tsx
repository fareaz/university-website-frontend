"use client";

import { useState } from "react";
import { createRole } from "@/services/role.service";

type Props = {
    onCreated: () => void;
};

export default function RoleForm({ onCreated }: Props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Role name is required");
            return;
        }

        try {
            setLoading(true);
            await createRole({ name: name.trim() });
            setName("");
            onCreated();
        } catch (err) {
            console.error(err);
            alert("Failed to create role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-2xl rounded-2xl">
            <div className="card-body">
                <h2 className="font-semibold mb-4">Add New Role</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            className="input input-sm input-bordered w-full"
                            placeholder="Role name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            The name is how it appears on your site.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Role"}
                    </button>
                </form>
            </div>
        </div>
    );
}
