export type DashboardData = {
    success: boolean;

    stats: {
        totalUsers: number;
        totalNotices: number;
        activeNotices: number;
        deletedNotices: number;
        totalDownloads: number;
        totalViews: number;
    };

    mostDownloadedNotice: {
        title: string;
        downloads: number;
    } | null;

    mostViewedNotice: {
        title: string;
        views: number;
    } | null;

    analytics: {
        date: string;
        totalNotices: number;
        totalDownloads: number;
        totalViews: number;
    }[];
};
