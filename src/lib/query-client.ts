import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a fresh TanStack Query client with foundational defaults.
 *
 * A factory (rather than a module-level singleton) is required so the App
 * Router can create one client per request on the server and one stable
 * client per session on the client — sharing an instance across requests
 * would leak cached data between users.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
