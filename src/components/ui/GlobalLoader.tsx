"use client";

export default function GlobalLoader() {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm text-gray-600 font-medium">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
}
