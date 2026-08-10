import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScheduleItem } from "@/components/dashboard/schedule-item";
import { mockUpcomingMeetings } from "@/data/mock-meetings";

/**
 * "Today's Schedule" widget — second right-column block, beneath the
 * mini calendar. components.md → Today's Schedule (timeline): a single
 * 376px white container (radius-lg/16px, 20px padding) holding the
 * header row and a 4-row timeline — same "single Card, header nested
 * inside" structure as `UpcomingMeetings` (Phase 6), not the
 * header-above-separate-cards structure `MeetingTypes` uses. Built on
 * `Card` (`padding="md"` = 20px, `radius="lg"` = 16px — zero extension).
 *
 * qa-checklist.md: "Same 4 events as Upcoming Meetings, mirrored
 * correctly" — reuses `mockUpcomingMeetings` (Phase 6) directly rather
 * than a second, independently-maintained mock list, so the two
 * sections can't silently drift apart.
 *
 * No fixed height: layout.md/components.md give `~300–330px`/`~320px`
 * as an approximation, same "approximate total vs. real content" case
 * already resolved for Upcoming Meetings, stat cards, and meeting-type
 * cards in Phases 5–7 — resolved the same way, in favor of real content.
 */
export function TodaysSchedule() {
  return (
    <Card
      role="region"
      aria-labelledby="todays-schedule-heading"
      padding="md"
      className="flex flex-col"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 id="todays-schedule-heading" className="text-heading text-ink">
          Today&apos;s Schedule
        </h2>
        <Link
          href="/calendar"
          prefetch={false}
          className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          See full day
        </Link>
      </div>

      <div className="relative flex flex-col">
        <span
          aria-hidden="true"
          className="bg-border-divider absolute top-3 bottom-3 left-16 w-0.5"
        />
        {mockUpcomingMeetings.map((meeting, index) => (
          <ScheduleItem
            key={meeting.id}
            meeting={meeting}
            isLast={index === mockUpcomingMeetings.length - 1}
          />
        ))}
      </div>
    </Card>
  );
}
