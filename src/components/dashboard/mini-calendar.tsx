"use client";

import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { getCalendarMonth, type CalendarDay } from "@/lib/calendar";
import { CALENDAR_EVENT_DATES } from "@/data/mock-calendar";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Mini calendar widget — first block in the right column. layout.md §9 /
 * components.md → Mini calendar widget. Built on `Card`
 * (`padding="lg"` = 24px, `radius="xl"` = 20px — both already match the
 * spec with zero extension; `radius-xl` was reserved for "calendar
 * widget" specifically back in Phase 2's radius-scale table).
 *
 * Month cursor and the selected date now live in `useAppStore` (not a
 * local `useState`) so the full `/calendar` page can share the exact
 * same navigation/selection state — picking a date here and opening
 * "View full calendar" lands on that date already selected there, and
 * vice versa. Still fully deterministic: the store's initial values are
 * the same fixed May 2025 / 20th constants this always used, never
 * derived from the real current date.
 */
export function MiniCalendar() {
  const year = useAppStore((state) => state.calendarYear);
  const month = useAppStore((state) => state.calendarMonth);
  const selectedDate = useAppStore((state) => state.selectedDate);
  const shiftCalendarMonth = useAppStore((state) => state.shiftCalendarMonth);
  const selectDate = useAppStore((state) => state.selectDate);

  const calendarMonth = getCalendarMonth(year, month);

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
          <CalendarDayCell
            key={day.isoDate}
            day={day}
            isSelected={day.isoDate === selectedDate}
            onSelect={() => selectDate(day.isoDate)}
          />
        ))}
      </div>

      <Link
        href="/calendar"
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
  isSelected: boolean;
  onSelect: () => void;
}

/**
 * Single date cell — now a real `<button>` (was a decorative `<div>`
 * before this pass): clicking selects the date app-wide via
 * `useAppStore().selectDate`. components.md: 6×7 grid, ~48×36px cells,
 * 13px date number; a 32×32 filled circle marks the selected date, a
 * 4px dot marks event dates. The dot is only rendered for non-selected
 * cells — the selected day's own 32px circle already fills nearly all
 * of the 36px cell height, and stacking a dot beneath it would overflow
 * the cell (32px circle + 2px gap + 4px dot = 38px > 36px). An invisible
 * same-size spacer keeps every non-selected cell's number vertically
 * aligned whether or not it has an event.
 */
function CalendarDayCell({ day, isSelected, onSelect }: CalendarDayCellProps) {
  const hasEvent = CALENDAR_EVENT_DATES.includes(day.isoDate);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`Select ${day.isoDate}${isSelected ? ", selected" : ""}`}
      className="focus-visible:ring-brand-800 flex h-9 flex-col items-center justify-center gap-0.5 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
          isSelected
            ? "bg-brand-800 text-surface font-semibold"
            : "hover:bg-surface-alt font-normal",
          !isSelected && (day.isCurrentMonth ? "text-ink" : "text-ink/40"),
        )}
      >
        {day.date}
      </span>
      {!isSelected &&
        (hasEvent ? (
          <span className="bg-brand-800 h-1 w-1 rounded-full" aria-hidden="true" />
        ) : (
          <span className="h-1 w-1" aria-hidden="true" />
        ))}
    </button>
  );
}
