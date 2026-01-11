"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import { useAdmins } from "@/hooks/useAdmins";
import SectionLoader from "@/components/ui/SectionLoader";
import { Log } from "@/types/log";
import Pagination from "@/components/ui/Pagination";

export default function AuditLogsPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    action: "",
    admin: "",
    targetType: "",
    from: "",
    to: "",
  });

  const { admins, loading: adminLoading } = useAdmins();
  const { data, loading } = useAuditLogs(filters);
  const pagination = data?.pagination;

  if (loading || adminLoading) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold mb-10">Audit <span className="text-primary">Logs</span></h1>
        <SectionLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-10">Audit <span className="text-primary">Logs</span> </h1>

      <div className="space-y-6">

        {/* 🔍 FILTER BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-5">

          {/* Action */}
          <select
            className="select select-bordered w-full"
            value={filters.action}
            onChange={(e) =>
              setFilters({ ...filters, action: e.target.value, page: 1 })
            }
          >
            <option value="">All Actions</option>
            <option value="NOTICE_CREATE">Notice Create</option>
            <option value="NOTICE_UPDATE">Notice Update</option>
            <option value="NOTICE_DELETE">Notice Delete</option>
            <option value="NOTICE_RESTORE">Notice Restore</option>
            <option value="NOTICE_PERMANENT_DELETE">Notice Permanent Delete</option>
            <option value="USER_ROLE_CHANGE">User Role Change</option>
          </select>

          {/* Admin */}
          <select
            className="select select-bordered w-full"
            value={filters.admin}
            onChange={(e) =>
              setFilters({ ...filters, admin: e.target.value, page: 1 })
            }
          >
            <option value="">All Admins</option>
            {admins.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* Target */}
          <select
            className="select select-bordered w-full"
            value={filters.targetType}
            onChange={(e) =>
              setFilters({ ...filters, targetType: e.target.value, page: 1 })
            }
          >
            <option value="">All Targets</option>
            <option value="Notice">Notice</option>
            <option value="User">User</option>
          </select>

          {/* From */}
          <input
            type="date"
            className="input input-bordered w-full"
            value={filters.from}
            onChange={(e) =>
              setFilters({ ...filters, from: e.target.value, page: 1 })
            }
          />

          {/* To */}
          <input
            type="date"
            className="input input-bordered w-full"
            value={filters.to}
            onChange={(e) =>
              setFilters({ ...filters, to: e.target.value, page: 1 })
            }
          />

          {/* Reset */}
          <button
            className="btn btn-warning w-full"
            onClick={() =>
              setFilters({
                page: 1,
                limit: 20,
                action: "",
                admin: "",
                targetType: "",
                from: "",
                to: "",
              })
            }
          >
            Reset
          </button>
        </div>

        {/* Pagination Top */}
        <div className="flex justify-center lg:justify-end">
          <Pagination
            page={pagination?.page}
            totalPages={pagination?.totalPages}
            onPageChange={(newPage) =>
              setFilters({ ...filters, page: newPage })
            }
          />
        </div>

        {/* 📋 TABLE */}
      
<div className="bg-base-100 shadow rounded">

  {/* Desktop Table */}
  <div className="overflow-x-auto hidden md:block">
    <table className="table table-zebra w-full">
      <thead className="sticky top-0 bg-base-200 z-10">
        <tr>
          <th>Sl.</th>
          <th>Admin</th>
          <th>Action</th>
          <th>Details</th>
          <th>Target</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {data?.data?.map((log: Log, index: number) => (
          <tr key={log._id}>
            <td>{index + 1}</td>

            <td>
              <div className="font-medium">{log?.admin?.name}</div>
              <div className="text-xs opacity-70">{log?.admin?.email}</div>
            </td>

            <td className="capitalize">
              {log?.action?.toLowerCase().split("_").join(" ")}
            </td>

            <td className="text-sm">
              {log?.meta?.title}
              {log?.action === "USER_ROLE_CHANGE" && (
                <p className="text-xs">
                  {log?.meta?.oldRole} → {log?.meta?.newRole}
                </p>
              )}
            </td>

            <td>{log?.targetType}</td>

            <td className="whitespace-nowrap">
              {new Date(log?.createdAt).toLocaleString("en-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile Card View */}
  <div className="md:hidden space-y-3 p-2">
    {data?.data?.map((log: Log, index: number) => (
      <div
        key={log._id}
        className="border border-gray-100 shadow-md  rounded-lg p-3 bg-base-200"
      >
        <div className="flex justify-between">
          <span className="font-bold">#{index + 1}</span>
          <span className="text-xs opacity-70">
            {new Date(log?.createdAt).toLocaleString("en-BD", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>

        <p className="font-semibold mt-1">{log?.admin?.name}</p>
        <p className="text-xs opacity-70">{log?.admin?.email}</p>

        <p className="mt-2">
          <span className="font-semibold">Action: </span>
          <span className="capitalize">
            {log?.action?.toLowerCase().split("_").join(" ")}
          </span>
        </p>

        {log?.meta?.title && (
          <p className="text-sm mt-1">
            <span className="font-semibold">Details:</span> {log?.meta?.title}
          </p>
        )}

        {log?.action === "USER_ROLE_CHANGE" && (
          <p className="text-xs mt-1">
            {log?.meta?.oldRole} → {log?.meta?.newRole}
          </p>
        )}

        <p className="mt-1">
          <span className="font-semibold">Target:</span> {log?.targetType}
        </p>
      </div>
    ))}
  </div>

</div>


      

      </div>
    </DashboardLayout>
  );
}
