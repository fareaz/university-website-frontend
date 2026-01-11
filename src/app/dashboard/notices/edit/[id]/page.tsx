import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EditNoticeForm from "@/components/dashboard/EditNoticeForm";
import { Props } from "@/types/props";

export default async function EditNoticePage({ params }: Props) {
    const { id } = await params;

    return (
        <DashboardLayout>
            <EditNoticeForm noticeId={id} />
        </DashboardLayout>
    );
}
