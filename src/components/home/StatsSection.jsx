"use client";

import Image from "next/image";
import { useNotices } from "@/hooks/useNotices";

// asset image import
import campusImg from "@/asset/ariel-schmunck-T03Sf0jQ9EI-unsplash.jpg";

const StatsSection = () => {
  const { data } = useNotices(1);

  return (
    <section className="py-16">
      <div className="px-6 max-w-11/12 mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={campusImg}
            alt="University campus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-cyan-900/20" />
        </div>

        {/* RIGHT STATS */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800">
            University Overview
          </h3>

          <div className="grid grid-cols-2 gap-6">

            {/* Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-400">
              <p className="text-slate-500">Departments</p>
              <h4 className="text-3xl font-bold text-cyan-600">12</h4>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-400">
              <p className="text-slate-500">Students</p>
              <h4 className="text-3xl font-bold text-cyan-600">6K+</h4>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-400">
              <p className="text-slate-500">Teachers</p>
              <h4 className="text-3xl font-bold text-cyan-600">350+</h4>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-cyan-400">
              <p className="text-slate-500">Notices</p>
              <h4 className="text-3xl font-bold text-cyan-600">
                {data?.pagination?.total || 0}
              </h4>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
