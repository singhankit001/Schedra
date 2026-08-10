import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContentShell } from "@/components/layout/main-content-shell";

/**
 * Shared shell for every authenticated app route (`/dashboard`,
 * `/meetings`, `/calendar`, ...): the full sidebar plus the main content
 * boundary. Route content (header, dashboard widgets, ...) is built in
 * later phases inside `MainContentShell`'s children.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <Sidebar />
      <MainContentShell>{children}</MainContentShell>
    </AppShell>
  );
}
