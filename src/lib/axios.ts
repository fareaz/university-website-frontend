import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
    // baseURL: "https://university-website-backend.onrender.com",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: false,
});

// 🔐 Attach NextAuth JWT
api.interceptors.request.use(async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
});

export default api;
