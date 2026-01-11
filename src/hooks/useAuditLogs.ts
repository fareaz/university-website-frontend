"use client";

import { useEffect, useState } from "react";
import { getAuditLogs } from "@/services/audit.service";

export function useAuditLogs(filters: any) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                setLoading(true);
                const res = await getAuditLogs(filters);
                if (mounted) {
                    setData(res);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [filters]);

    return { data, loading };
}
