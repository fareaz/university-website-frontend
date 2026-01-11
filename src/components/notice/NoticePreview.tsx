import { Notice } from "@/types/notice";

type Props = {
    notice: Notice;
};

export default function NoticePreview({ notice }: Props) {
    // const fileUrl = `https://university-website-backend.onrender.com/${notice?.file?.path}`;
    const fileUrl = notice?.file?.url;
    const type = notice?.file?.mimetype;


    // Image preview
    if (type?.startsWith("image/")) {
        return (
            <div className="border rounded bg-neutral-800 p-2 max-h-[500px] overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={fileUrl}
                    alt="Notice preview"
                    className="w-10/12 mx-auto object-contain rounded"
                />
            </div>
        );
    }

    return (
        <p className="text-sm text-gray-500">
            Preview not available for this file type.
        </p>
    );
}
