import type { Metadata } from "next";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings";
import { MeetingTypes } from "@/components/dashboard/meeting-types";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import { TodaysSchedule } from "@/components/dashboard/todays-schedule";
import { NewMeetingCta } from "@/components/dashboard/new-meeting-cta";

export const metadata: Metadata = {
  title: "Dashboard · MeetPlan",
};

/**
 * layout.md §5: the header (now rendered once by `AppLayout`, shared
 * across every route) spans the full content width above a two-column
 * grid (left 776px / 24px gap / right 376px). Every dashboard section
 * built so far is composed here.
 *
 * Responsive (Phase 11, responsive.md §31): below `xl` (1440px, the
 * reference's own breakpoint) the two-column row becomes
 * `flex-direction: column` and both columns switch from their fixed
 * `w-col-left`/`w-col-right` widths to `w-full` — the 776/376 split only
 * makes sense at the width it was measured at. Reading order when
 * stacked is left-column-content-then-right-column-content (Banner,
 * Stats, Upcoming Meetings, Meeting Types, then Calendar, Today's
 * Schedule, New Meeting), a deliberate simplification of
 * responsive.md's suggested fully-interleaved order (Banner → Calendar →
 * Stats → Upcoming → Schedule → New Meeting → Meeting Types) — that
 * order requires every section to be a sibling in one flex context with
 * per-breakpoint `order-*` values, which would mean restructuring the
 * validated two-column DOM this phase was told not to touch without
 * concrete evidence. See DESIGN_SYSTEM.md.
 *
 * All three `gap-6` (24px) rhythms below step down to `gap-4` (16px)
 * below `md` (900px), per responsive.md's "adjusting layout density...
 * gaps 24px → 16px below md." The right column's own two gaps
 * (calendar→schedule 24px, schedule→CTA 16px) aren't part of that
 * uniform rhythm (Phase 10), so only the first gets the same `md:`
 * step-up treatment; the second is already at the "reduced" value.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 xl:flex-row">
      <div className="xl:w-col-left flex w-full flex-col gap-4 md:gap-6">
        <WelcomeBanner />
        <DashboardStats />
        <UpcomingMeetings />
        <MeetingTypes />
      </div>
      <div className="xl:w-col-right flex w-full flex-col">
        <MiniCalendar />
        <div className="mt-4 md:mt-6">
          <TodaysSchedule />
        </div>
        <div className="mt-4">
          <NewMeetingCta />
        </div>
      </div>
    </div>
  );
}
