
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>

      <button
        onClick={() => router.back()}
        className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
      >
        ⬅ Go Back
      </button>
    </div>
  );
}
