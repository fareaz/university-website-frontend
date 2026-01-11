import { FaFilePdf, FaFileImage, FaFileArchive } from "react-icons/fa";

export default function FileTypeIcon({ type }: { type: string }) {
    if (type.includes("pdf")) {
        return <FaFilePdf className="text-red-500" />;
    }

    if (type.includes("image")) {
        return <FaFileImage className="text-blue-500" />;
    }

    if (type.includes("zip")) {
        return <FaFileArchive className="text-yellow-500" />;
    }

    return null;
}
