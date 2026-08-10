"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { getCalendarMonth, shiftMonth, type CalendarDay } from "@/lib/calendar";
import {
  CALENDAR_EVENT_DATES,
  CALENDAR_INITIAL_MONTH,
  CALENDAR_INITIAL_YEAR,
  CALENDAR_SELECTED_DATE,
} from "@/data/mock-calendar";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Mini calendar widget — first block in the right column. layout.md §9 /
 * components.md → Mini calendar widget. Built on `Card`
 * (`padding="lg"` = 24px, `radius="xl"` = 20px — both already match the
 * spec with zero extension; `radius-xl` was reserved for "calendar
 * widget" specifically back in Phase 2's radius-scale table).
 *
 * Month navigation is real (`useState`, no external store needed) —
 * deterministic and side-effect-free, so the initial render (May 2025,
 * matching the reference exactly) is what Playwright/QA always sees on
 * load, and every subsequent state is a pure function of click count,
 * never the real current date.
 */
export function MiniCalendar() {
  const [{ year, month }, setCursor] = useState({
    year: CALENDAR_INITIAL_YEAR,
    month: CALENDAR_INITIAL_MONTH,
  });
  const calendarMonth = getCalendarMonth(year, month);

  const goToPreviousMonth = () => setCursor((cursor) => shiftMonth(cursor.year, cursor.month, -1));
  const goToNextMonth = () => setCursor((cursor) => shiftMonth(cursor.year, cursor.month, 1));

  return (
    <Card
      role="region"
      aria-labelledby="mini-calendar-heading"
      padding="lg"
      radius="xl"
      className="flex w-full flex-col"
    >
      <div className="flex h-8 items-center justify-between">
        <h2
          id="mini-calendar-heading"
          aria-live="polite"
          className="text-md text-ink font-semibold"
        >
          {calendarMonth.label}
        </h2>
        <div className="flex items-center gap-2">
          <IconButton
            icon={<ChevronLeft className="h-4 w-4" aria-hidden="true" />}
            aria-label="Previous month"
            size="sm"
            variant="ghost"
            onClick={goToPreviousMonth}
          />
          <IconButton
            icon={<ChevronRight className="h-4 w-4" aria-hidden="true" />}
            aria-label="Next month"
            size="sm"
            variant="ghost"
            onClick={goToNextMonth}
          />
        </div>
      </div>

      <div className="mt-4 grid h-6 grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="text-overline text-ink-muted flex items-center justify-center"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7">
        {calendarMonth.days.map((day) => (
          <CalendarDayCell key={day.isoDate} day={day} />
        ))}
      </div>

      <Link
        href="/calendar"
        prefetch={false}
        className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface mt-4 inline-flex w-fit items-center gap-1.5 rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        View full calendar
      </Link>
    </Card>
  );
}

interface CalendarDayCellProps {
  day: CalendarDay;
}

/**
 * Single date cell. components.md: 6×7 grid, ~48×36px cells, 13px date
 * number; a 32×32 filled circle marks the selected date, a 4px dot marks
 * event dates. The dot is only rendered for non-selected cells — the
 * selected day's own 32px circle already fills nearly all of the 36px
 * cell height, and stacking a dot beneath it isn't evidenced in the spec
 * and would overflow the cell (32px circle + 2px gap + 4px dot = 38px >
 * 36px). An invisible same-size spacer keeps every non-selected cell's
 * number vertically aligned whether or not it has an event.
 */
function CalendarDayCell({ day }: CalendarDayCellProps) {
  const isSelected = day.isoDate === CALENDAR_SELECTED_DATE;
  const hasEvent = CALENDAR_EVENT_DATES.includes(day.isoDate);

  return (
    <div className="flex h-9 flex-col items-center justify-center gap-0.5">
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-sm",
          isSelected ? "bg-brand-800 text-surface font-semibold" : "font-normal",
          !isSelected && (day.isCurrentMonth ? "text-ink" : "text-ink/40"),
        )}
      >
        {day.date}
        {isSelected ? <span className="sr-only"> (selected)</span> : null}
      </span>
      {!isSelected &&
        (hasEvent ? (
          <span className="bg-brand-800 h-1 w-1 rounded-full" aria-hidden="true" />
        ) : (
          <span className="h-1 w-1" aria-hidden="true" />
        ))}
    </div>
  );
}
