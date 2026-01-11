import { File } from "@/types/file";
import { FaFileImage, FaFileAlt } from "react-icons/fa";
import { TbFileTypeJpg, TbFileTypePng } from "react-icons/tb";
import { SiJpeg } from "react-icons/si";

export const getFileIcon = (file: File | undefined) => {
    if (!file) {
        return <FaFileAlt className="text-gray-400" />;
    }

    const ext: string | undefined = file?.originalname;

    if (ext?.endsWith("jpg")) {
        return <TbFileTypeJpg  className="text-amber-600 text-3xl" />;
    }
    if (ext?.endsWith("jpeg")) {
        return <SiJpeg  className="text-green-600 text-3xl" />;
    }
    if (ext?.endsWith("png")) {
        return <TbFileTypePng className="text-indigo-600 text-3xl" />;
    }

    return <FaFileImage className="text-indigo-600 text-3xl" />;
};
