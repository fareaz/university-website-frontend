"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function useAdmins() {
    const [admins, setAdmins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/users/admins")
            .then(res => setAdmins(res.data))
            .catch(() => setAdmins([]))
            .finally(() => setLoading(false));
    }, []);

    return { admins, loading };
}
