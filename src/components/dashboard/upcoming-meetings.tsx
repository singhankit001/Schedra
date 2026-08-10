import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MeetingRow } from "@/components/dashboard/meeting-row";
import { mockUpcomingMeetings } from "@/data/mock-meetings";

/**
 * Upcoming Meetings widget. components.md → Upcoming Meetings list: a
 * single 776px white container (radius-lg, 20px padding) holding both the
 * "Upcoming Meetings" / "View all" header row and the 4 meeting rows —
 * unlike "Your Meeting Types" (Phase 8+), whose header sits *above* four
 * separate cards, this section's header and rows share one bordered
 * surface, so it's built directly on `Card` (role="region" instead of a
 * wrapping `<section>`, since `Card` already renders the single div this
 * needs).
 *
 * No fixed height: `~300–330px` in layout.md is a rounded approximation
 * of 20px padding + 28px header + 16px margin + 4 real rows, the same
 * "approximate total vs. precise parts" conflict resolved in Phase 5 for
 * the stat cards — resolved the same way, in favor of the real values.
 */
export function UpcomingMeetings() {
  return (
    <Card role="region" aria-labelledby="upcoming-meetings-heading" className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="upcoming-meetings-heading" className="text-heading text-ink">
          Upcoming Meetings
        </h2>
        <Link
          href="/meetings"
          prefetch={false}
          className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col">
        {mockUpcomingMeetings.map((meeting, index) => (
          <MeetingRow
            key={meeting.id}
            meeting={meeting}
            isLast={index === mockUpcomingMeetings.length - 1}
          />
        ))}
      </div>
    </Card>
  );
}
