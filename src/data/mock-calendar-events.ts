import type { Meeting } from "@/types/meeting";

/**
 * Additional demo meetings dated across the mini calendar's reference
 * month (May 2025), separate from `mockUpcomingMeetings` (today's real
 * date, Phase 6 — what "Upcoming Meetings"/"Today's Schedule" show and
 * were pixel-validated against). These exist purely so the full
 * `/calendar` page's day view has something real to show when a user
 * clicks around the May 2025 grid, matching `mock-calendar.ts`'s
 * `CALENDAR_EVENT_DATES` dots. Never shown on the dashboard itself.
 */
export const mockCalendarEvents: Meeting[] = [
  {
    id: "cal-standup-may6",
    title: "Weekly Standup",
    subtitle: "Engineering",
    startsAt: "2025-05-06T15:00:00.000Z",
    endsAt: "2025-05-06T15:30:00.000Z",
    provider: "google-meet",
    status: "completed",
    attendees: [{ id: "maya-chen", name: "Maya Chen", email: "maya.chen@example.com" }],
  },
  {
    id: "cal-client-may12",
    title: "Client Check-in",
    subtitle: "Acme Corporation",
    startsAt: "2025-05-12T17:00:00.000Z",
    endsAt: "2025-05-12T17:30:00.000Z",
    provider: "zoom",
    status: "completed",
    attendees: [{ id: "riley-park", name: "Riley Park", email: "riley.park@example.com" }],
  },
  {
    id: "cal-planning-may22",
    title: "Quarterly Planning",
    subtitle: "Leadership Team",
    startsAt: "2025-05-22T14:00:00.000Z",
    endsAt: "2025-05-22T15:00:00.000Z",
    provider: "microsoft-teams",
    status: "completed",
    attendees: [
      { id: "jordan-lee", name: "Jordan Lee", email: "jordan.lee@example.com" },
      { id: "priya-nair", name: "Priya Nair", email: "priya.nair@example.com" },
    ],
  },
  {
    id: "cal-review-may28",
    title: "Design Handoff",
    subtitle: "Product Team",
    startsAt: "2025-05-28T16:30:00.000Z",
    endsAt: "2025-05-28T17:00:00.000Z",
    provider: "google-meet",
    status: "completed",
    attendees: [{ id: "sam-osei", name: "Sam Osei", email: "sam.osei@example.com" }],
  },
];
