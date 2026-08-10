import type { Notification } from "@/types/notification";

/**
 * Local placeholder notifications for the header bell. No backend exists
 * yet — the unread count (3) matches the reference/qa-checklist's
 * expected badge value. Isolated here so a real notifications API can
 * replace this module later without touching `NotificationButton`.
 */
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "New meeting request",
    description: "Acme Corporation wants to schedule a product demo.",
    createdAt: "2026-08-10T09:15:00.000Z",
    read: false,
  },
  {
    id: "notif-2",
    title: "Meeting starting soon",
    description: "Design Review starts in 15 minutes.",
    createdAt: "2026-08-10T09:00:00.000Z",
    read: false,
  },
  {
    id: "notif-3",
    title: "Invitation accepted",
    description: "Jordan accepted your meeting invitation.",
    createdAt: "2026-08-10T08:30:00.000Z",
    read: false,
  },
];
