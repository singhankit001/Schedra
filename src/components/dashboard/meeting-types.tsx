"use client";

import Link from "next/link";
import { MeetingTypeCard } from "@/components/dashboard/meeting-type-card";
import { useAppStore } from "@/stores/app-store";

/**
 * "Your Meeting Types" section. components.md: header row ("Your Meeting
 * Types" + "Manage all" link) sits *above* 4 separate cards — the
 * opposite structure from `UpcomingMeetings` (Phase 6), whose header is
 * nested inside one wrapping `Card`. Same `grid-cols-4 gap-4` pattern as
 * `DashboardStats` (Phase 5): card width (182px) comes from the grid,
 * not a hardcoded value.
 *
 * Reads live from `useAppStore` (not the static `MEETING_TYPE_CARDS`
 * array directly) so editing/deleting a type from its kebab menu
 * updates this grid immediately.
 *
 * Responsive (Phase 11): same `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`
 * reflow as `DashboardStats` — responsive.md groups stat cards and
 * meeting-type cards under the same "Cards" reflow rule.
 */
export function MeetingTypes() {
  const meetingTypes = useAppStore((state) => state.meetingTypes);

  return (
    <section aria-labelledby="meeting-types-heading" className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="meeting-types-heading" className="text-heading text-ink">
          Your Meeting Types
        </h2>
        <Link
          href="/meeting-types"
          className="text-label text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Manage all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {meetingTypes.length === 0 ? (
          <p className="text-body-sm text-ink-muted col-span-full py-6 text-center">
            No meeting types yet.
          </p>
        ) : (
          meetingTypes.map((card) => <MeetingTypeCard key={card.meetingType.id} data={card} />)
        )}
      </div>
    </section>
  );
}
