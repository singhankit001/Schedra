import type { Meeting } from "@/types/meeting";

/**
 * Placeholder Upcoming Meetings list (Phase 6). No backend/calendar
 * integration exists yet — reuses the `Meeting` domain type from
 * `src/types/meeting.ts` (defined in Phase 1) rather than a parallel
 * shape, so swapping this array for a real API response later doesn't
 * require touching `UpcomingMeetings`/`MeetingRow`.
 *
 * Titles match qa-checklist.md's "Upcoming Meetings" list exactly: Design
 * Review, Product Demo, Interview – UX Designer, Sales Call. Subtitles and
 * times were corrected against the actual reference image (previously
 * invented, since no visual-spec file gives per-row values — see
 * DESIGN_SYSTEM.md's "Final visual correction pass"): "Team Sync",
 * "Acme Corporation", "Hiring Team", "Global Solutions" at 09:30 AM,
 * 11:00 AM, 02:30 PM, and 04:00 PM respectively. Timed today (matches
 * `mock-notifications.ts`'s precedent of using the real current date) so
 * `formatMeetingDay` resolves to "Today" as shown in the reference.
 * Interview and Sales Call carry 4 and 3 attendees respectively so the
 * avatar-overflow chip renders both qa-checklist examples ("+2", "+1").
 */
export const mockUpcomingMeetings: Meeting[] = [
  {
    id: "design-review",
    title: "Design Review",
    subtitle: "Team Sync",
    startsAt: "2026-08-10T09:30:00.000Z",
    endsAt: "2026-08-10T10:00:00.000Z",
    provider: "google-meet",
    status: "scheduled",
    attendees: [
      { id: "maya-chen", name: "Maya Chen", email: "maya.chen@example.com" },
      { id: "sam-osei", name: "Sam Osei", email: "sam.osei@example.com" },
    ],
  },
  {
    id: "product-demo",
    title: "Product Demo",
    subtitle: "Acme Corporation",
    startsAt: "2026-08-10T11:00:00.000Z",
    endsAt: "2026-08-10T11:30:00.000Z",
    provider: "zoom",
    status: "scheduled",
    attendees: [
      {
        id: "riley-park",
        name: "Riley Park",
        email: "riley.park@example.com",
        company: "Acme Corporation",
      },
    ],
  },
  {
    id: "interview-ux-designer",
    title: "Interview – UX Designer",
    subtitle: "Hiring Team",
    startsAt: "2026-08-10T14:30:00.000Z",
    endsAt: "2026-08-10T15:15:00.000Z",
    provider: "microsoft-teams",
    status: "scheduled",
    attendees: [
      { id: "jordan-lee", name: "Jordan Lee", email: "jordan.lee@example.com" },
      { id: "priya-nair", name: "Priya Nair", email: "priya.nair@example.com" },
      { id: "tom-becker", name: "Tom Becker", email: "tom.becker@example.com" },
      { id: "ana-silva", name: "Ana Silva", email: "ana.silva@example.com" },
    ],
  },
  {
    id: "sales-call",
    title: "Sales Call",
    subtitle: "Global Solutions",
    startsAt: "2026-08-10T16:00:00.000Z",
    endsAt: "2026-08-10T16:30:00.000Z",
    provider: "google-meet",
    status: "scheduled",
    attendees: [
      {
        id: "chris-dale",
        name: "Chris Dale",
        email: "chris.dale@example.com",
        company: "Global Solutions",
      },
      {
        id: "nina-osei",
        name: "Nina Osei",
        email: "nina.osei@example.com",
        company: "Global Solutions",
      },
      {
        id: "leo-fischer",
        name: "Leo Fischer",
        email: "leo.fischer@example.com",
        company: "Global Solutions",
      },
    ],
  },
];
