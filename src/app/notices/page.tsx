"use client";

import { useState } from "react";
import NoticeCard from "@/components/notice/NoticeCard";
import { useNotices } from "@/hooks/useNotices";
import SectionLoader from "@/components/ui/SectionLoader";

export default function NoticesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNotices(page);

  if (isLoading) {
    return <SectionLoader />;
  }

  return (
    <div className="p-6 max-w-11/12 mx-auto bg-gradient-to-r from-cyan-50 via-white to-cyan-50">
      <h1 className="text-3xl font-bold text-center mb-10">
        All <span className="bg-gradient-to-r to-cyan-400 from-cyan-800
              bg-clip-text text-transparent">Notice</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {data?.data
          ?.filter((n) => !n.isDeleted)
          ?.map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-4 py-2 text-sm">
          Page {data?.pagination?.page} /{" "}
          {data?.pagination?.totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === data?.pagination?.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
