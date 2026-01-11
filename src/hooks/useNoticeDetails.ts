"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type ErrorPayload = {
    type: "LOGIN_REQUIRED" | "ROLE_RESTRICTED" | "FAILED";
    message?: string;
    info?: string;
    allowedRoles?: string[];
};

export function useNoticeDetails(id: string) {
    const [notice, setNotice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorPayload | null>(null);

    useEffect(() => {
        if (!id) return;

        const load = async () => {
            try {
                const res = await api.get(`/notices/${id}`);
                setNotice(res.data);
                setError(null);
            } catch (err: any) {
                const data = err.response?.data;

                if (err.response?.status === 401) {
                    setError({
                        type: "LOGIN_REQUIRED",
                        message: data?.message,
                        info: data?.info,
                        allowedRoles: data?.allowedRoles || [],
                    });
                } else if (err.response?.status === 403) {
                    setError({
                        type: "ROLE_RESTRICTED",
                        message: data?.message,
                        info: data?.info,
                        allowedRoles: data?.allowedRoles || [],
                    });
                } else {
                    setError({
                        type: "FAILED",
                        message: "Failed to load notice",
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id]);

    return { notice, loading, error };
}
