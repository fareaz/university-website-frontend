import { Notice } from "@/types/notice";
import { formatFileSize } from "@/utils/formatFileSize";

type Props = {
    notice: Notice;
};

export default function NoticeMetaTable({ notice }: Props) {
    const rows = [
        {
            label: "Downloads",
            value: notice.downloadCount,
        },
        {
            label: "Views",
            value: notice.viewCount,
        },
        {
            label: "File Name",
            value: notice.file?.originalname ?? "—",
        },
        {
            label: "File Size",
            value: formatFileSize(notice?.file?.size) ?? "—",
        },
        {
            label: "Categories",
            value:
                notice.categories?.map(c => c.name).join(", ") || "—",
        },
        {
            label: "Roles",
            value: notice.allowedRoles.length > 0 ? (
                <span className="capitalize">
                    {notice.allowedRoles?.map(c => c.name).join(", ") || "—"}
                </span>
            ) : "N/A",
        },
        {
            label: "Create Date",
            value: new Date(notice.createdAt).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }
            ),
        },
        {
            label: "Update Date",
            value: notice.updatedAt ? new Date(notice.updatedAt).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }
            ) : "",
        },
    ];

    return (
        <div className="border border-gray-300 shadow-lg rounded-lg divide-y bg-base-100">
            {rows.map((row, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between border-gray-300 px-4 py-3"
                >
                    <span className="text-sm font-medium text-gray-700">
                        {row.label}
                    </span>

                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-md">
                        {row.value}
                    </span>
                </div>
            ))}
        </div>
    );
}
