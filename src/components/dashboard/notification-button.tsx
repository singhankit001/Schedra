import { Bell } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/data/mock-notifications";

/**
 * Header notification control. components.md → Header: 40×40px
 * white/rounded-square button (radius-sm, 10px), 18×18 bell icon, with a
 * 16×16 circular count badge offset −4px/−4px from the top-right corner.
 *
 * Built on the existing `IconButton` (size `lg` = 40px, `variant="solid"`
 * = white bg + border) and `Badge` (`variant="orange"` = solid fill,
 * matching the reference's orange badge) — only the badge's absolute
 * position is bespoke, not a new badge implementation.
 */
export function NotificationButton() {
  const unreadCount = mockNotifications.filter((notification) => !notification.read).length;

  return (
    <span className="relative inline-flex">
      <IconButton
        icon={<Bell className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />}
        aria-label="Notifications"
        size="lg"
        variant="solid"
      />
      {unreadCount > 0 ? (
        <Badge
          variant="orange"
          className="border-surface pointer-events-none absolute -top-1 -right-1 border-2"
        >
          {unreadCount}
        </Badge>
      ) : null}
    </span>
  );
}
