"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MeetingRow } from "@/components/dashboard/meeting-row";
import { getTodayIsoDate } from "@/lib/meeting-time";
import { getMeetingsForDate, useAppStore } from "@/stores/app-store";

/**
 * Upcoming Meetings widget. components.md → Upcoming Meetings list: a
 * single 776px white container (radius-lg, 20px padding) holding both the
 * "Upcoming Meetings" / "View all" header row and the meeting rows —
 * unlike "Your Meeting Types" (Phase 8+), whose header sits *above* four
 * separate cards, this section's header and rows share one bordered
 * surface, so it's built directly on `Card` (role="region" instead of a
 * wrapping `<section>`, since `Card` already renders the single div this
 * needs).
 *
 * Now reads live from `useAppStore` (filtered to today, same
 * deterministic UTC date-key `formatMeetingDay` already uses) instead of
 * the static `mockUpcomingMeetings` array directly — a meeting created
 * for today via the New Meeting modal appears here immediately; a
 * cancelled one disappears. Kept scoped to *today* rather than "any
 * future date" so the section's already-validated default content
 * (today's 4 reference meetings) stays deterministic regardless of what
 * hour it's viewed at, and doesn't silently change scope from what
 * qa-checklist.md validated.
 */
export function UpcomingMeetings() {
  const meetings = useAppStore((state) => state.meetings);
  const todaysMeetings = getMeetingsForDate(meetings, getTodayIsoDate());

  return (
    <Card role="region" aria-labelledby="upcoming-meetings-heading" className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="upcoming-meetings-heading" className="text-heading text-ink">
          Upcoming Meetings
        </h2>
        <Link
          href="/meetings"
          className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col">
        {todaysMeetings.length === 0 ? (
          <p className="text-body-sm text-ink-muted py-6 text-center">
            No meetings scheduled for today.
          </p>
        ) : (
          todaysMeetings.map((meeting, index) => (
            <MeetingRow
              key={meeting.id}
              meeting={meeting}
              isLast={index === todaysMeetings.length - 1}
            />
          ))
        )}
      </div>
    </Card>
  );
}
