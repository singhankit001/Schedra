import { Avatar } from "@/components/ui/avatar";
import { DashboardSearch } from "@/components/dashboard/dashboard-search";
import { NotificationButton } from "@/components/dashboard/notification-button";
import { mockAccount } from "@/data/mock-account";

/**
 * Dashboard header row: search (left) + notification bell and user avatar
 * (right). layout.md §6: 44–48px tall, `justify-content: space-between`,
 * spans the full main-content width above both columns; 16px gap between
 * the bell and avatar. Same `mockAccount` identity as the sidebar footer
 * (Phase 3) — one placeholder "current user" for the whole app.
 */
export function DashboardHeader() {
  return (
    <header className="flex h-11 w-full items-center justify-between">
      <DashboardSearch />
      <div className="flex items-center gap-4">
        <NotificationButton />
        <Avatar
          alt={mockAccount.name}
          initials={mockAccount.name.charAt(0)}
          size="lg"
          status="online"
        />
      </div>
    </header>
  );
}
