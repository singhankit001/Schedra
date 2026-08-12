import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebarDrawer } from "@/components/layout/mobile-sidebar-drawer";
import { MainContentShell } from "@/components/layout/main-content-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ModalHost } from "@/components/dashboard/modal-host";
import { Toaster } from "@/components/ui/toast";

/**
 * Shared shell for every authenticated app route (`/dashboard`,
 * `/meetings`, `/calendar`, ...): sidebar + header + main content
 * boundary. `DashboardHeader` was promoted here from the dashboard page
 * itself once a second route needed it — every route now gets the same
 * search/notifications/avatar row for free instead of re-importing it
 * per page. `ModalHost`/`Toaster` are mounted once here too: both render
 * `null`/nothing unless their store state says otherwise, so they add
 * zero visual footprint on pages that don't use them.
 *
 * `Sidebar` (persistent: tablet rail + full desktop) and
 * `MobileSidebarDrawer` (off-canvas, <768px) are both always mounted —
 * each is a no-op at the widths it doesn't own (`Sidebar` renders
 * `hidden` below `tablet`; the drawer renders `null` whenever
 * `useUIStore().isSidebarOpen` is false), so there's no viewport
 * detection here deciding which to render — pure CSS/store-state, no JS
 * resize listener.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <Sidebar />
      <MobileSidebarDrawer />
      <MainContentShell>
        <div className="flex flex-1 flex-col gap-4 md:gap-6">
          <DashboardHeader />
          {children}
        </div>
      </MainContentShell>
      <ModalHost />
      <Toaster />
    </AppShell>
  );
}
