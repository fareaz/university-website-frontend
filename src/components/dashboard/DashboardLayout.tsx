"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SectionLoader from "@/components/ui/SectionLoader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { UserRole } from "@/types/role";

const allowedRoles: UserRole[] = ["admin", "teacher"];

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(session.user.role)) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SectionLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          h-screen bg-base-100 border-r
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar role={session.user.role} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-base-100 p-4 md:p-6 overflow-x-auto">
        {/* Mobile Header */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-outline btn-sm text-primary"
          >
            Menu
          </button>
          <h2 className="text-lg font-semibold text-primary">Dashboard</h2>
        </div>

        {children}
      </main>
    </div>
  );
}
