"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ScheduleItem } from "@/components/dashboard/schedule-item";
import { getTodayIsoDate } from "@/lib/meeting-time";
import { getMeetingsForDate, useAppStore } from "@/stores/app-store";

/**
 * "Today's Schedule" widget — second right-column block, beneath the
 * mini calendar. components.md → Today's Schedule (timeline): a single
 * 376px white container (radius-lg/16px, 20px padding) holding the
 * header row and a timeline — same "single Card, header nested inside"
 * structure as `UpcomingMeetings`, not the header-above-separate-cards
 * structure `MeetingTypes` uses. Built on `Card` (`padding="md"` = 20px,
 * `radius="lg"` = 16px — zero extension).
 *
 * qa-checklist.md: "Same 4 events as Upcoming Meetings, mirrored
 * correctly" — reads the same live store `UpcomingMeetings` does,
 * filtered to today, so the two sections can't drift apart and both
 * update together when a meeting is created/cancelled.
 */
export function TodaysSchedule() {
  const meetings = useAppStore((state) => state.meetings);
  const todaysMeetings = getMeetingsForDate(meetings, getTodayIsoDate());

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
          className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          See full day
        </Link>
      </div>

      {todaysMeetings.length === 0 ? (
        <p className="text-body-sm text-ink-muted py-6 text-center">
          No meetings scheduled for today.
        </p>
      ) : (
        <div className="relative flex flex-col">
          <span
            aria-hidden="true"
            className="bg-border-divider absolute top-3 bottom-3 left-16 w-0.5"
          />
          {todaysMeetings.map((meeting, index) => (
            <ScheduleItem
              key={meeting.id}
              meeting={meeting}
              isLast={index === todaysMeetings.length - 1}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
