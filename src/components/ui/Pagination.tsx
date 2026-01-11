"use client";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-end items-center gap-5 mt-6">

            <button
                className="btn btn-outline btn-sm"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                ⬅ Previous
            </button>

            <div className="text-sm font-medium">
                Page <span className="font-bold">{page}</span> of{" "}
                <span className="font-bold">{totalPages}</span>
            </div>

            <button
                className="btn btn-outline btn-sm"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next ➡
            </button>
        </div>
    );
}