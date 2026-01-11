import { useNotices } from "@/hooks/useNotices";
import SectionLoader from "../ui/SectionLoader";
import NoticeCard from "../notice/NoticeCard";

const LatestNotice = () => {
    const {data, isLoading} = useNotices(1);

    if (isLoading) {
        return <SectionLoader />;
    }

    return (
        <section className="py-14 bg-base-200">
            <h3 className="text-4xl font-bold text-center mb-10">
                Latest <span className="text-primary">Notice</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-10">
                {
                    data?.data?.filter(n => !n.isDeleted)?.slice(0, 4)?.map((notice) => (
                        <NoticeCard key={notice._id} notice={notice}/>
                    ))
                }
            </div>
        </section>
    );
};

export default LatestNotice;