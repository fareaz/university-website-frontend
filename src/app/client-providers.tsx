"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { LoadingProvider } from "@/context/LoadingContext";
import { useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <LoadingProvider>
      <Providers>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Providers>
    </LoadingProvider>
  );
}
