"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { PageHeader } from "@/components/dashboard/page-header";
import { ScheduleItem } from "@/components/dashboard/schedule-item";
import { getCalendarMonth } from "@/lib/calendar";
import { CALENDAR_EVENT_DATES } from "@/data/mock-calendar";
import { getMeetingsForDate, useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Full calendar page — "View full calendar" (mini calendar) and "See
 * full day" (Today's Schedule) both land here. Shares the exact same
 * `calendarYear`/`calendarMonth`/`selectedDate` store slice the mini
 * calendar uses, so navigating/selecting here and on the dashboard stay
 * in sync. The day-detail panel is real: it looks up meetings for
 * whichever date is selected via `getMeetingsForDate` over the full
 * store (today's dashboard meetings + the May 2025 demo events), not a
 * static "coming soon" placeholder.
 */
export default function CalendarPage() {
  const year = useAppStore((state) => state.calendarYear);
  const month = useAppStore((state) => state.calendarMonth);
  const selectedDate = useAppStore((state) => state.selectedDate);
  const shiftCalendarMonth = useAppStore((state) => state.shiftCalendarMonth);
  const selectDate = useAppStore((state) => state.selectDate);
  const meetings = useAppStore((state) => state.meetings);

  const calendarMonth = getCalendarMonth(year, month);
  const dayMeetings = getMeetingsForDate(meetings, selectedDate);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Calendar" description="Browse any month and see what's scheduled." />

      <div className="flex gap-6">
        <Card padding="lg" radius="xl" className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-md text-ink font-semibold">{calendarMonth.label}</h2>
            <div className="flex items-center gap-2">
              <IconButton
                icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
                aria-label="Previous month"
                size="sm"
                variant="ghost"
                onClick={() => shiftCalendarMonth(-1)}
              />
              <IconButton
                icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
                aria-label="Next month"
                size="sm"
                variant="ghost"
                onClick={() => shiftCalendarMonth(1)}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7">
            {WEEKDAY_LABELS.map((label) => (
              <span key={label} className="text-overline text-ink-muted py-2 text-center">
                {label}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7">
            {calendarMonth.days.map((day) => {
              const isSelected = day.isoDate === selectedDate;
              const hasEvent = CALENDAR_EVENT_DATES.includes(day.isoDate);
              return (
                <button
                  key={day.isoDate}
                  type="button"
                  onClick={() => selectDate(day.isoDate)}
                  aria-pressed={isSelected}
                  className="focus-visible:ring-brand-800 flex h-16 flex-col items-center justify-center gap-1 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                      isSelected
                        ? "bg-brand-800 text-surface font-semibold"
                        : "hover:bg-surface-alt font-normal",
                      !isSelected && (day.isCurrentMonth ? "text-ink" : "text-ink/40"),
                    )}
                  >
                    {day.date}
                  </span>
                  {!isSelected && hasEvent ? (
                    <span className="bg-brand-800 h-1 w-1 rounded-full" aria-hidden="true" />
                  ) : (
                    <span className="h-1 w-1" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card padding="lg" className="flex w-96 shrink-0 flex-col">
          <h2 className="text-md text-ink font-semibold">
            {new Date(`${selectedDate}T00:00:00Z`).toLocaleDateString("en-US", {
              timeZone: "UTC",
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
          {dayMeetings.length === 0 ? (
            <p className="text-body-sm text-ink-muted mt-6 text-center">No meetings on this day.</p>
          ) : (
            <div className="relative mt-4 flex flex-col">
              <span
                aria-hidden="true"
                className="bg-border-divider absolute top-3 bottom-3 left-16 w-0.5"
              />
              {dayMeetings.map((meeting, index) => (
                <ScheduleItem
                  key={meeting.id}
                  meeting={meeting}
                  isLast={index === dayMeetings.length - 1}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
