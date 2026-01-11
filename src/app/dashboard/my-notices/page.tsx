"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useCallback, useEffect, useState } from "react";
import {
  bulkRestoreNotice,
  getMyNotices,
  getNoticeCounts,
  permanentDeleteNotices,
  restoreNotice,
  softDeleteNotice,
} from "@/services/adminNotice.service";
import { Notice } from "@/types/notice";
import Link from "next/link";
import Swal from "sweetalert2";
import SectionLoader from "@/components/ui/SectionLoader";

const MyNotices = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const [counts, setCounts] = useState({ published: 0, trash: 0 });

  const loadData = useCallback(async () => {
    const res = await getMyNotices({ page, search, isDeleted });
    setData(res);
  }, [page, search, isDeleted]);

  useEffect(() => {
    loadData();
    getNoticeCounts().then(setCounts);
  }, [loadData]);

  const handleRestore = async (ids: string | string[]) => {
    if (Array.isArray(ids)) await bulkRestoreNotice(ids);
    else await restoreNotice(ids);

    await loadData();
    getNoticeCounts().then(setCounts);
  };

  const applyBulkAction = async () => {
    if (!bulkAction) return alert("Please select a bulk action");
    if (selectedIds.length === 0)
      return alert("Please select at least one notice");

    try {
      if (bulkAction === "trash") {
        await Promise.all(selectedIds.map(id => softDeleteNotice(id)));
      }

      if (bulkAction === "restore") {
        await bulkRestoreNotice(selectedIds);
      }

      if (bulkAction === "delete") {
        if (!confirm("This cannot be undone")) return;
        await permanentDeleteNotices(selectedIds);
      }

      setSelectedIds([]);
      setBulkAction("");
      await loadData();
      getNoticeCounts().then(setCounts);
    } catch (err) {
      console.error(err);
      alert("Bulk action failed");
    }
  };

  if (!data) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-10">
          My <span className="text-primary">Notices</span>
        </h1>
        <SectionLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-10">
        My <span className="text-primary">Notices</span>
      </h1>

      {/* Tabs */}
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

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-2">
          <select
            className="select select-sm select-bordered"
            value={bulkAction}
            onChange={e => setBulkAction(e.target.value)}
          >
            <option value="">Bulk actions</option>
            {!isDeleted && <option value="trash">Move to Trash</option>}
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
          className="input input-sm input-bordered"
          placeholder="Search notices"
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

      {/* TABLE */}
      <div className="bg-base-100 shadow-2xl rounded-2xl overflow-x-auto hidden md:block">
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
            {data.data.map((n: Notice, i: number) => (
              <tr key={n._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(n._id)}
                    onChange={e =>
                      setSelectedIds(prev =>
                        e.target.checked
                          ? [...prev, n._id]
                          : prev.filter(id => id !== n._id)
                      )
                    }
                  />
                </td>

                <td>{i + 1}</td>
                <td>{n.title}</td>
                <td>{n.categories.map(c => c.name).join(", ")}</td>
                <td>{n.allowedRoles.map(r => r.name).join(", ")}</td>
                <td>{n.createdBy?.name}</td>
                <td>{new Date(n.createdAt).toLocaleString()}</td>
                <td>{new Date(n.updatedAt).toLocaleString()}</td>

                <td className="flex gap-2">
                  <Link
                    href={`/notices/${n._id}`}
                    className="btn btn-secondary btn-sm"
                  >
                    View
                  </Link>

                  {!isDeleted && (
                    <>
                      <Link
                        href={`/dashboard/notices/edit/${n._id}`}
                        className="btn btn-info btn-sm"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={async () => {
                          const r = await Swal.fire({
                            title: "Are you sure?",
                            text: "You can restore it later from Trash",
                            icon: "warning",
                            showCancelButton: true,
                          });
                          if (!r.isConfirmed) return;
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
                        onClick={() =>
                          permanentDeleteNotices([n._id]).then(loadData)
                        }
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
    </DashboardLayout>
  );
};

export default MyNotices;
