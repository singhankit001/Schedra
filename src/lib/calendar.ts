export interface CalendarDay {
  /** 1–31, the day-of-month number to display. */
  date: number;
  /** Stable "YYYY-MM-DD" key (always UTC), used to match selected/event
   * dates regardless of the viewer's local timezone. */
  isoDate: string;
  /** false for the leading/trailing padding days from the adjacent
   * months that fill out the 6×7 grid. */
  isCurrentMonth: boolean;
}

export interface CalendarMonth {
  year: number;
  /** 0–11 */
  month: number;
  /** "May 2025" */
  label: string;
  /** Always 42 entries (6 weeks × 7 days), Sunday-first. */
  days: CalendarDay[];
}

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Builds a Sunday-first, 6-week (42-day) grid for the given month, padded
 * with the trailing days of the previous month and the leading days of
 * the next — matches layout.md §9 / components.md's "6 rows × 7 columns"
 * mini calendar. All date math runs in UTC (`Date.UTC`/`toISOString`), so
 * the grid is identical regardless of the viewer's local timezone —
 * the same UTC-pinning already used for meeting times
 * (`src/lib/meeting-time.ts`, Phase 6).
 */
export function getCalendarMonth(year: number, month: number): CalendarMonth {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const startOffset = firstOfMonth.getUTCDay(); // 0 (Sun) – 6 (Sat)
  const gridStart = new Date(Date.UTC(year, month, 1 - startOffset));

  const days: CalendarDay[] = Array.from({ length: 42 }, (_, index) => {
    const cellDate = new Date(gridStart);
    cellDate.setUTCDate(gridStart.getUTCDate() + index);
    return {
      date: cellDate.getUTCDate(),
      isoDate: cellDate.toISOString().slice(0, 10),
      isCurrentMonth: cellDate.getUTCMonth() === month,
    };
  });

  return {
    year,
    month,
    label: monthLabelFormatter.format(firstOfMonth),
    days,
  };
}

/** Adds `delta` months to a (year, month) pair, wrapping the year. Pure —
 * no dependency on the current date, so navigation stays deterministic. */
export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}
