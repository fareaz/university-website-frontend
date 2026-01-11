export default function AdminPagination({
    page,
    totalPages,
    setPage,
}: {
    page: number;
    totalPages: number;
    setPage: (p: number) => void;
}) {
    return (
        <div className="flex justify-end mt-4 gap-2">
            <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                «
            </button>

            <span className="px-3 py-2 text-sm">
        {page} of {totalPages}
      </span>

            <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                »
            </button>
        </div>
    );
}
