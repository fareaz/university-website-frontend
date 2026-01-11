"use client";

import Link from "next/link";
import { NavItem } from "@/components/dashboard/NavItem";
import { signOut } from "next-auth/react";
import { UserRole } from "@/types/role";

type SidebarProps = {
  role: UserRole;
};

export default function Sidebar({ role }: SidebarProps) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="w-64 h-screen bg-base-100 border-r">
      <div className="p-4 border-b">
        <Link
          href="/"
          className="font-bold text-xl flex items-center gap-2 mb-5"
        >
          <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
            UD
          </span>
          <span>
            RMIT <span className="text-primary">University </span>
            <br />
            Dashboard
          </span>
        </Link>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {(role === "admin" || role === "teacher") && (
            <li>
              <NavItem href="/dashboard">Overview</NavItem>
            </li>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavItem href="/dashboard/audit-logs">Audit Logs</NavItem>
              </li>
              <li>
                <NavItem href="/dashboard/notices">All Notice</NavItem>
              </li>
            </>
          )}

          {role === "teacher" && (
            <li>
              <NavItem href="/dashboard/my-notices">My Notices</NavItem>
            </li>
          )}

          {(role === "admin" || role === "teacher") && (
            <li>
              <NavItem href="/dashboard/upload-notice">Upload Notice</NavItem>
            </li>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavItem href="/dashboard/categories">
                  Manage Categories
                </NavItem>
              </li>
              <li>
                <NavItem href="/dashboard/roles">Manage Roles</NavItem>
              </li>
              <li>
                <NavItem href="/dashboard/users">Manage Users</NavItem>
              </li>
            </>
          )}

          <li>
            <button
              className="btn btn-sm btn-error btn-block mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
