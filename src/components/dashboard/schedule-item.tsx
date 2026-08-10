import { MoreVertical } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { formatMeetingTime } from "@/lib/meeting-time";
import { PROVIDER_STYLES } from "@/lib/meeting-provider";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types/meeting";

export interface ScheduleItemProps {
  meeting: Meeting;
  /** Suppresses the row's own bottom gap on the last item — the
   * continuous rail line (drawn once by `TodaysSchedule`, not per row)
   * doesn't need trailing space past the final dot. */
  isLast?: boolean;
}

/**
 * Single Today's Schedule timeline row. components.md → Today's Schedule
 * (timeline): time label (~56px wide) → rail dot (8px, on a continuous
 * connector line owned by the parent) → event card (radius-md/12px,
 * 12px padding) containing provider icon (24×24), title 14/600,
 * subtitle 13/400 muted, and a 20×20 kebab top-right.
 *
 * Reuses `Meeting`/`PROVIDER_STYLES` exactly as `MeetingRow` (Phase 6)
 * does — qa-checklist.md requires this section show "the same 4 events
 * as Upcoming Meetings, mirrored correctly," so both components render
 * off the same data and the same provider→glyph/color mapping.
 */
export function ScheduleItem({ meeting, isLast = false }: ScheduleItemProps) {
  const provider = PROVIDER_STYLES[meeting.provider];
  const ProviderIcon = provider.icon;

  return (
    <div className={cn("flex", !isLast && "pb-3")}>
      <div className="flex w-14 shrink-0 justify-end pt-1 pr-3">
        <span className="text-ink text-sm font-medium">{formatMeetingTime(meeting.startsAt)}</span>
      </div>

      <div className="relative z-10 flex w-4 shrink-0 justify-center pt-2.5">
        <span className="bg-brand-800 h-2 w-2 rounded-full" aria-hidden="true" />
      </div>

      <div className="bg-surface ml-3 min-w-0 flex-1 rounded-md p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center">
              <ProviderIcon
                className={cn("h-6 w-6", provider.color)}
                aria-hidden="true"
                strokeWidth={1.75}
              />
              <span className="sr-only">{provider.label}</span>
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              {/* responsive.md §31 → "Lists": "event card content wraps
                  rather than truncates where possible." Truncated to a
                  single line from `md` (900px) up — the validated
                  desktop behavior — and allowed to wrap below that. */}
              <p className="text-ink text-base font-semibold md:truncate">{meeting.title}</p>
              {meeting.subtitle ? (
                <p className="text-body-sm text-ink-muted md:truncate">{meeting.subtitle}</p>
              ) : null}
            </div>
          </div>

          <IconButton
            icon={<MoreVertical className="h-3.5 w-3.5" aria-hidden="true" />}
            aria-label={`More options for ${meeting.title}`}
            size="xs"
            variant="ghost"
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
