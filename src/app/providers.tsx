"use client";

import { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root client-side provider tree. Kept intentionally small for this phase —
 * only the TanStack Query client is wired up. Future phases can add auth,
 * theme, or toast providers here without touching the server layout.
 */
export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
