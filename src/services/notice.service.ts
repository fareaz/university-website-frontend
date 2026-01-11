import api from "@/lib/axios";

export const getNotices = async (
    page = 1,
    limit = 10
) => {
    const res = await api.get("/notices", {
        params: { page, limit },
    });

    return res.data;
};

export const downloadNotice = async (id: string, originalName: string) => {
    const res = await api.get(`/notices/${id}/download`, {
        responseType: "blob", // MUST
    });

    // 🔽 Create blob URL
    const blob = new Blob([res.data], {
        type: res.headers["content-type"],
    });

    const url = window.URL.createObjectURL(blob);

    // 🔽 Extract filename from header
    const contentDisposition = res.headers["content-disposition"];
    // let filename = "notice-file";
    let filename = originalName;

    if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match?.[1]) filename = match[1];
    }

    // 🔽 Force download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // 🔽 Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
};
