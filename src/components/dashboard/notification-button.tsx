"use client";

import { Bell } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Badge } from "@/components/ui/badge";
import { useDismissablePopover } from "@/lib/use-dismissable-popover";
import { useAppStore } from "@/stores/app-store";

function timeAgo(iso: string): string {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

/**
 * Header notification control. components.md → Header: 40×40px
 * white/rounded-square button (radius-sm, 10px), 18×18 bell icon, with a
 * 16×16 circular count badge offset −4px/−4px from the top-right corner.
 *
 * Now a real popover (not a decorative badge): clicking the bell opens a
 * panel listing every notification from the store, with a "Mark all as
 * read" action that actually clears `read` state — the badge count is
 * live-derived from that same state, so it visibly drops to nothing
 * once marked read.
 */
export function NotificationButton() {
  const notifications = useAppStore((state) => state.notifications);
  const markAllNotificationsRead = useAppStore((state) => state.markAllNotificationsRead);
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const { open, setOpen, containerRef } = useDismissablePopover<HTMLDivElement>();

  return (
    <div ref={containerRef} className="relative inline-flex">
      <span className="relative inline-flex">
        <IconButton
          icon={<Bell className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
          aria-expanded={open}
          size="lg"
          variant="solid"
          onClick={() => setOpen((value) => !value)}
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

      {open ? (
        <div
          role="dialog"
          aria-label="Notifications"
          className="bg-surface border-border shadow-shell absolute top-full right-0 z-40 mt-2 w-80 rounded-md border p-2"
        >
          <div className="flex items-center justify-between px-2 py-1">
            <p className="text-label text-ink">Notifications</p>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-caption text-brand-800 focus-visible:ring-brand-800 rounded-xs hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                Mark all as read
              </button>
            ) : null}
          </div>
          {notifications.length === 0 ? (
            <p className="text-body-sm text-ink-muted px-2 py-4 text-center">No notifications</p>
          ) : (
            <ul className="flex max-h-80 flex-col gap-0.5 overflow-y-auto">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="hover:bg-surface-alt flex flex-col gap-0.5 rounded-sm px-2 py-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-body-sm text-ink font-medium">{notification.title}</p>
                    {!notification.read ? (
                      <span
                        className="bg-accent-orange mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  {notification.description ? (
                    <p className="text-caption text-ink-muted">{notification.description}</p>
                  ) : null}
                  <p className="text-micro text-ink-muted">{timeAgo(notification.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
