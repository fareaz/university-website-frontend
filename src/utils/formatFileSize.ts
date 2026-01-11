// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function formatFileSize(bytes: number | undefined): string {
    if (bytes === 0) {
        return "0 B";
    }

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    if (bytes != null) {
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = bytes / Math.pow(k, i);
        return `${value.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
    }
}
