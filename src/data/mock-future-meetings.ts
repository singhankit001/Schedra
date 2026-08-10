import type { Meeting } from "@/types/meeting";

/**
 * Additional real, `scheduled` meetings dated after today — separate
 * from `mockUpcomingMeetings` (today's 4, shown in "Upcoming Meetings"/
 * "Today's Schedule" and pixel-validated against the reference) so those
 * two sections' already-correct content stays exactly as-is.
 *
 * These exist so the "Upcoming Meetings" stat card can be a genuinely
 * live count (`meetings.filter(startsAt >= today && status ===
 * "scheduled").length`) that actually matches the reference's "8"
 * instead of only counting the 4 meetings visible today — the
 * reference's stat clearly counts more than just what's listed below
 * it, and a real app's "upcoming meetings" total naturally would too.
 * Not shown in any dashboard list; they only surface on `/meetings` and
 * `/calendar` (for their own dates), and contribute to the live stat.
 */
export const mockFutureMeetings: Meeting[] = [
  {
    id: "future-team-retro",
    title: "Team Retro",
    subtitle: "Engineering",
    startsAt: "2026-08-12T16:00:00.000Z",
    endsAt: "2026-08-12T16:30:00.000Z",
    provider: "google-meet",
    status: "scheduled",
    attendees: [{ id: "maya-chen", name: "Maya Chen", email: "maya.chen@example.com" }],
  },
  {
    id: "future-client-onboarding",
    title: "Client Onboarding",
    subtitle: "Acme Corporation",
    startsAt: "2026-08-13T14:00:00.000Z",
    endsAt: "2026-08-13T15:00:00.000Z",
    provider: "zoom",
    status: "scheduled",
    attendees: [{ id: "riley-park", name: "Riley Park", email: "riley.park@example.com" }],
  },
  {
    id: "future-one-on-one",
    title: "1:1 with Manager",
    subtitle: "Career check-in",
    startsAt: "2026-08-14T15:30:00.000Z",
    endsAt: "2026-08-14T16:00:00.000Z",
    provider: "microsoft-teams",
    status: "scheduled",
    attendees: [{ id: "jordan-lee", name: "Jordan Lee", email: "jordan.lee@example.com" }],
  },
  {
    id: "future-budget-review",
    title: "Budget Review",
    subtitle: "Finance",
    startsAt: "2026-08-17T17:00:00.000Z",
    endsAt: "2026-08-17T17:45:00.000Z",
    provider: "google-meet",
    status: "scheduled",
    attendees: [{ id: "priya-nair", name: "Priya Nair", email: "priya.nair@example.com" }],
  },
];
