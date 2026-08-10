"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { STAT_CARDS } from "@/lib/stats";
import { getTodayIsoDate } from "@/lib/meeting-time";
import { getUpcomingMeetingsCount, useAppStore } from "@/stores/app-store";

/**
 * KPI/statistics grid. layout.md §8: 4 equal-width cards spanning the
 * 776px left column with 16px gaps. Uses CSS Grid (`grid-cols-4 gap-4`)
 * so each card's ~182px width is derived from the column's real width
 * rather than hardcoded — layout.md's own math, (776 − 3×16) / 4 = 182,
 * is exactly what `grid-cols-4` computes automatically.
 *
 * "Upcoming Meetings" is the one card with an honest, real local
 * computation available: `getUpcomingMeetingsCount` (every `scheduled`
 * meeting today or later — deliberately broader than what "Upcoming
 * Meetings"/"Today's Schedule" list, which is only today's) — so its
 * `value` is overridden live instead of using `STAT_CARDS`' static
 * string. Pending Invitations / Hours Booked / Revenue stay static:
 * there's no invitation, time-tracking, or billing model in this app to
 * derive them from, and fabricating one would be a fake number dressed
 * up as a real one, not a genuine "stats update."
 *
 * Responsive (Phase 11, responsive.md §31 → "Cards"): `grid-cols-4` only
 * from `xl` (1440px) up — the exact, validated desktop value. Below
 * that: `sm:grid-cols-2` (600px+, spec: "stat cards may drop to 2 per
 * row" / "2×2"), and a single column below `sm`. The 16px gap is held
 * constant at every size, per spec ("gap held at 16px throughout").
 */
export function DashboardStats() {
  const meetings = useAppStore((state) => state.meetings);
  const upcomingCount = getUpcomingMeetingsCount(meetings, getTodayIsoDate());

  return (
    <section
      aria-label="Key statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {STAT_CARDS.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat.id === "upcoming-meetings" ? { ...stat, value: String(upcomingCount) } : stat}
        />
      ))}
    </section>
  );
}
