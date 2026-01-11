type Props = {
    tab: "published" | "trash";
    setTab: (v: any) => void;
    search: string;
    setSearch: (v: string) => void;
    total: number;
};

export default function AdminNoticeFilters({
       tab,
       setTab,
       search,
       setSearch,
       total,
   }: Props) {
    return (
        <div className="flex items-center justify-between mb-4 border-b pb-3">
            <div className="space-x-3">
                <button
                    className={tab === "published" ? "font-bold" : ""}
                    onClick={() => setTab("published")}
                >
                    Published
                </button>
                |
                <button
                    className={tab === "trash" ? "font-bold" : ""}
                    onClick={() => setTab("trash")}
                >
                    Trash
                </button>
            </div>

            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Search notices"
                    className="input input-sm input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span className="text-sm text-gray-500">
          {total} items
        </span>
            </div>
        </div>
    );
}
