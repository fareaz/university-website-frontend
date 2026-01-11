"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
    getAdminNotices,
    getNoticeCounts,
    softDeleteNotice,
    restoreNotice,
    bulkRestoreNotice,
    permanentDeleteNotices,
} from "@/services/adminNotice.service";
import { Notice } from "@/types/notice";
import Link from "next/link";
import Swal from "sweetalert2";
import SectionLoader from "@/components/ui/SectionLoader";
import { Category } from "@/types/category";
import { Role } from "@/types/role";

export default function AdminNoticesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [bulkAction, setBulkAction] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [data, setData] = useState<any>(null);
    const [counts, setCounts] = useState({
        published: 0,
        trash: 0,
    });

    const loadData = useCallback(async () => {
        const res = await getAdminNotices({
            page,
            search,
            isDeleted,
        });
        setData(res);
    }, [page, search, isDeleted]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData().then();
        getNoticeCounts().then(setCounts);
    }, [loadData]);

    const handleRestore = async (ids: string | string[]) => {
        try {
            if (Array.isArray(ids)) {
                await bulkRestoreNotice(ids);
            } else {
                await restoreNotice(ids);
            }

            await loadData();
            await getNoticeCounts();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            });
        }
    };

    // const toggleAll = (checked: boolean) => {
    //     if (checked) {
    //         setSelectedIds(data.data.map((n: any) => n._id));
    //     } else {
    //         setSelectedIds([]);
    //     }
    // };

    const applyBulkAction = async () => {
        if (!bulkAction) {
            alert("Please select a bulk action");
            return;
        }

        if (selectedIds.length === 0) {
            alert("Please select at least one notice");
            return;
        }

        try {
            if (bulkAction === "trash") {
                // published → trash
                await Promise.all(
                    selectedIds.map(id => softDeleteNotice(id))
                );
            }

            if (bulkAction === "restore") {
                await bulkRestoreNotice(selectedIds);
            }

            if (bulkAction === "delete") {
                if (!confirm("Are you sure? This cannot be undone.")) return;
                await permanentDeleteNotices(selectedIds);
            }

            // reset UI
            setSelectedIds([]);
            setBulkAction("");

            // reload table + counts
            await loadData();
            await getNoticeCounts();

        } catch (error) {
            alert("Bulk action failed");
        }
    };

    if (!data) {
        return (
            <DashboardLayout>
                <h1 className="text-2xl font-bold mb-10">All <span className="text-primary">Notice</span></h1>
                <SectionLoader/>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-10">
                All <span className="text-primary">Notice</span>
            </h1>

            {/* Published / Trash tabs */}
            <div className="flex gap-4 border-b pb-5 mb-5">
                <button
                    className={!isDeleted ? "font-bold" : "text-gray-500"}
                    onClick={() => {
                        setIsDeleted(false);
                        setPage(1);
                    }}
                >
                    Published ({counts.published})
                </button>

                <button
                    className={isDeleted ? "font-bold" : "text-gray-500"}
                    onClick={() => {
                        setIsDeleted(true);
                        setPage(1);
                        setSelectedIds([]);
                    }}
                >
                    Trash ({counts.trash})
                </button>
            </div>

            {/* Top toolbar */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex gap-2">
                    <select
                        className="select select-sm select-bordered"
                        value={bulkAction}
                        onChange={e => setBulkAction(e.target.value)}
                    >
                        <option value="">Bulk actions</option>

                        {!isDeleted && (
                            <option value="trash">Move to Trash</option>
                        )}

                        {isDeleted && (
                            <>
                                <option value="restore">Restore</option>
                                <option value="delete">Delete Permanently</option>
                            </>
                        )}
                    </select>

                    <button className="btn btn-sm btn-warning" onClick={applyBulkAction}>
                        Apply
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search notices"
                    className="input input-sm input-bordered"
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* Pagination header */}
            <div className="flex justify-between items-center my-5">
                <span>{data?.pagination?.total} notices found</span>

                <div className="flex gap-2">
                    <button
                        className="btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        «
                    </button>

                    <span>
                        {page} of {data?.pagination?.totalPages}
                    </span>

                    <button
                        className="btn btn-sm"
                        disabled={page === data?.pagination?.totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        »
                    </button>
                </div>
            </div>

            {/* TABLE WRAPPER */}
            <div className="bg-base-100 shadow-2xl rounded-2xl">

                {/* ================= DESKTOP / TABLET TABLE ================= */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="table table-zebra w-full">
                        <thead>
                        <tr>
                            <th></th>
                            <th>SL</th>
                            <th>Title</th>
                            <th>Categories</th>
                            <th>Roles</th>
                            <th>Author</th>
                            <th>Created</th>
                            <th>Updated</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data?.data?.map((n: Notice, index: number) => (
                            <tr key={n._id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(n._id)}
                                        onChange={(e) => {
                                            if (e.target.checked)
                                                setSelectedIds(prev => [...prev, n._id]);
                                            else
                                                setSelectedIds(prev => prev.filter(id => id !== n._id));
                                        }}
                                    />
                                </td>

                                <td>{index + 1}</td>

                                <td className="font-medium">{n.title}</td>

                                <td>{n.categories.map((c: Category) => c.name).join(", ")}</td>

                                <td className="capitalize">
                                    {n.allowedRoles.map((r: Role) => r.name).join(", ")}
                                </td>

                                <td>{n?.createdBy?.name}</td>

                                <td className="whitespace-nowrap">
                                    {new Date(n?.createdAt).toLocaleString()}
                                </td>

                                <td className="whitespace-nowrap">
                                    {new Date(n?.updatedAt).toLocaleString()}
                                </td>

                                <td className="flex flex-wrap gap-2">
                                    <Link href={`/notices/${n._id}`}
                                          className="btn btn-secondary btn-sm">
                                        View
                                    </Link>

                                    {!isDeleted && (
                                        <>
                                            <Link href={`/dashboard/notices/edit/${n._id}`}
                                                  className="btn btn-info btn-sm">
                                                Edit
                                            </Link>

                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={async () => {
                                                    const result = await Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "You will be able to restore this from Trash!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Yes, move to Trash",
                                                    });
                                                    if (!result.isConfirmed) {
                                                        return;
                                                    }
                                                    await softDeleteNotice(n._id);
                                                    await loadData();
                                                }}
                                            >
                                                Trash
                                            </button>
                                        </>
                                    )}

                                    {isDeleted && (
                                        <>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleRestore(n._id)}
                                            >
                                                Restore
                                            </button>

                                            <button
                                                className="btn btn-error btn-sm"
                                                onClick={async () => {
                                                    const result = await Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "You won't be able to revert this!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Delete Permanently",
                                                    });
                                                    if (!result.isConfirmed) {
                                                        return;
                                                    }
                                                    await permanentDeleteNotices([n._id]);
                                                    await loadData();
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARD VIEW ================= */}
                <div className="md:hidden space-y-3 p-2">
                    {data?.data?.map((n: Notice, index: number) => (
                        <div key={n._id}
                             className="border border-gray-100 shadow-md  rounded-xl p-3 bg-base-200 space-y-2">

                            <div className="flex justify-between">
                                <span className="font-bold">#{index + 1}</span>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(n._id)}
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setSelectedIds(prev => [...prev, n._id]);
                                        else
                                            setSelectedIds(prev => prev.filter(id => id !== n._id));
                                    }}
                                />
                            </div>

                            <p className="font-semibold text-lg">{n.title}</p>

                            <p className="text-sm">
                                <span className="font-semibold">Categories: </span>
                                {n.categories.map((c: Category) => c.name).join(", ")}
                            </p>

                            <p className="text-sm capitalize">
                                <span className="font-semibold">Roles: </span>
                                {n.allowedRoles.map((r: Role) => r.name).join(", ")}
                            </p>

                            <p className="text-sm">
                                <span className="font-semibold">Author: </span>
                                {n?.createdBy?.name}
                            </p>

                            <p className="text-xs opacity-80">
                                Created: {new Date(n?.createdAt).toLocaleString()}
                            </p>

                            <p className="text-xs opacity-80">
                                Updated: {new Date(n?.updatedAt).toLocaleString()}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <Link href={`/notices/${n._id}`}
                                      className="btn btn-secondary btn-sm w-full">
                                    View
                                </Link>

                                {!isDeleted && (
                                    <>
                                        <Link href={`/dashboard/notices/edit/${n._id}`}
                                              className="btn btn-info btn-sm w-full">
                                            Edit
                                        </Link>

                                        <button
                                            className="btn btn-primary btn-sm w-full"
                                            onClick={() => softDeleteNotice(n._id)}
                                        >
                                            Trash
                                        </button>
                                    </>
                                )}

                                {isDeleted && (
                                    <>
                                        <button
                                            className="btn btn-primary btn-sm w-full"
                                            onClick={() => handleRestore(n._id)}
                                        >
                                            Restore
                                        </button>

                                        <button
                                            className="btn btn-error btn-sm w-full"
                                            onClick={() => permanentDeleteNotices([n._id])}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}