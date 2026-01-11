"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getAdminDashboard } from "@/services/adminDashboard.service";
import StatCard from "@/components/dashboard/StatCard";
import MetricBox from "@/components/dashboard/MetricBox";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import SectionLoader from "@/components/ui/SectionLoader";
import { DashboardData } from "@/types/dashboardData";

export default function DashboardOverviewPage() {
    const [days, setDays] = useState(7);
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        getAdminDashboard(days)
            .then((res) => {
                setData(res);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [days]);

    if (!data) {
        return (
            <DashboardLayout>
                <h1 className="text-2xl font-bold mb-10"><span className="text-primary">Admin</span> Overview</h1>
                <SectionLoader />
            </DashboardLayout>
        );
    }

    const {
        stats,
        mostDownloadedNotice,
        mostViewedNotice,
        analytics,
    } = data;

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-10 text-primary"> Overview</h1>

            {/* ================= METRICS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers}
                    link="/dashboard/users"
                />

                <StatCard
                    title="Total Notices"
                    value={stats?.totalNotices}
                    link="/dashboard/notices"
                />

                <StatCard
                    title="Active Notices"
                    value={stats?.activeNotices}
                    link="/dashboard/notices"
                />

                <StatCard
                    title="Deleted Notices"
                    value={stats?.deletedNotices}
                    link="/dashboard/notices?tab=trash"
                />
            </div>

            {/* ================= FILE METRICS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <MetricBox
                    title="Total Downloads"
                    value={stats?.totalDownloads}
                />
                <MetricBox
                    title="Total Views"
                    value={stats?.totalViews}
                />
            </div>

            {/* ================= MOST ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="font-semibold mb-2">
                            Most Downloaded Notice
                        </h2>

                        {mostDownloadedNotice ? <>
                            <p className="font-medium">
                                {mostDownloadedNotice?.title}
                            </p>
                            <p className="font-medium">
                                Total Downloads: <span className="font-bold">{mostDownloadedNotice?.downloads}</span>
                            </p>
                        </> : (
                            <p className="text-gray-500">
                                No data available
                            </p>
                        )}
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="font-semibold mb-2">
                            Most Viewed Notice
                        </h2>

                        {mostViewedNotice ? <>
                            <p className="font-medium">
                                {mostViewedNotice?.title}
                            </p>
                            <p className="font-medium">
                                Total Views: <span className="font-bold">{mostViewedNotice?.views}</span>
                            </p>
                        </> : (
                            <p className="text-gray-500">
                                No data available
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= ANALYTICS ================= */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                    System Growth (Last {days} Days)
                </h2>

                <select
                    className="select select-sm select-bordered"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                >
                    <option value={7}>Last 7 Days</option>
                    <option value={15}>Last 15 Days</option>
                    <option value={30}>Last 30 Days</option>
                </select>
            </div>

            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    {loading ? (
                        <div className="h-72 flex items-center justify-center">
                            <SectionLoader />
                        </div>
                    ) : !analytics || analytics.length === 0 ? (
                        <p className="text-gray-500">No analytics data</p>
                    ) : (
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />

                                    <YAxis yAxisId="left" allowDecimals={false} />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        allowDecimals={false}
                                        domain={[0, "dataMax + 5"]}
                                    />

                                    <Tooltip />

                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="totalNotices"
                                        name="Total Notices"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        dot={false}
                                    />

                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="totalDownloads"
                                        name="Total Downloads"
                                        stroke="#16a34a"
                                        strokeWidth={2}
                                        dot={false}
                                    />

                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="totalViews"
                                        name="Total Views"
                                        stroke="#ea580c"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

        </DashboardLayout>
    );
}
