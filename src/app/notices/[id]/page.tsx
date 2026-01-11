"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useNoticeDetails } from "@/hooks/useNoticeDetails";
import NoticePreview from "@/components/notice/NoticePreview";
import SectionLoader from "@/components/ui/SectionLoader";
import NoticeMetaTable from "@/components/notice/NoticeMetaTable";
import Footer from "@/components/Footer";
import { downloadNotice } from "@/services/notice.service";
import { IoMdDownload } from "react-icons/io";

export default function NoticeDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const { notice, loading, error } = useNoticeDetails(id);

    if (loading) {
        return (
            <>
                {/* <Navbar /> */}
                <div className="max-w-7xl mx-auto p-6">
                    <SectionLoader />
                </div>
            </>
        );
    }

    if (error?.type === "LOGIN_REQUIRED") {
        return (
            <>
                
                <div className="max-w-7xl mx-auto p-6">
                    <p className="alert alert-warning">
                        <strong>To see this notice, login first</strong>
                    </p>
                </div>
            </>
        );
    }

    if (error?.type === "ROLE_RESTRICTED") {
        return (
            <>
         
                <div className="max-w-7xl mx-auto p-6">
                    <div className="alert alert-info">
                        <strong>Restricted Notice</strong>
                        <p>
                            This notice is only for{" "}
                            <span className="font-semibold">
                                {error?.allowedRoles?.join(", ")}
                            </span>{" "}
                            specific role.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return <p>Notice couldn&#39;t loaded!</p>
    }

    return (
        <>
            

            <div className="">
                <h1 className="text-4xl font-bold text-center bg-base-300 py-16 mb-2">
                    {notice?.title}
                </h1>

                <div className="max-w-7xl mx-auto p-6">
                    <p className="text-[18px] text-gray-600 mb-6">
                        <span className="font-bold">Details: </span>{notice?.description}
                    </p>

                    <NoticePreview notice={notice} />

                    <div className="mt-10">
                        {
                            notice && <NoticeMetaTable notice={notice} />
                        }
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            className="btn btn-primary"
                            onClick={() => downloadNotice(notice?._id, notice?.file?.originalname)}
                        >
                            <IoMdDownload />Download Notice
                        </button>
                    </div>
                </div>
            </div>

          
        </>
    );
}
