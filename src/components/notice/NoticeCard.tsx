"use client";

import Link from "next/link";
import { Notice } from "@/types/notice";
import { FaCalendarAlt } from "react-icons/fa";
import { getFileIcon } from "@/helper/getFileIcon";

type Props = {
  notice: Notice;
};

export default function NoticeCard({ notice }: Props) {
  const { _id, title, createdAt, file } = notice;

  return (
    <Link href={`/notices/${_id}`} className="block">
      <div
        className="
          relative overflow-hidden
          rounded-[28px]
          p-5 flex gap-4
          bg-white/35 backdrop-blur-xl
          border border-white/60
          shadow-[0_20px_40px_rgba(0,0,0,0.12)]
          transition-all duration-300
          hover:shadow-[0_28px_56px_rgba(0,0,0,0.16)]
          hover:-translate-y-0.5
          cursor-pointer
        "
      >
        {/* inner glass highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />

        {/* subtle glass shine */}
        <div className="pointer-events-none absolute -top-12 -left-12 w-40 h-40 bg-white/40 rounded-full blur-3xl" />

        {/* FILE ICON */}
        <div className="flex-shrink-0 pt-1 text-cyan-600 relative z-10">
          {getFileIcon(file)}
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-2 relative z-10">
          <h2 className="text-cyan-600 font-semibold leading-snug">
            {title}
          </h2>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FaCalendarAlt className="text-xs" />
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
