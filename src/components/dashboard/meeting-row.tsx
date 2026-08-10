import { MoreVertical } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { formatMeetingDay, formatMeetingTime } from "@/lib/meeting-time";
import { PROVIDER_STYLES } from "@/lib/meeting-provider";
import { cn, getInitials } from "@/lib/utils";
import type { Meeting } from "@/types/meeting";

const VISIBLE_ATTENDEES = 2;

export interface MeetingRowProps {
  meeting: Meeting;
  /** Suppresses the bottom divider on the last row. */
  isLast?: boolean;
}

/**
 * Single Upcoming Meetings row. components.md → Upcoming Meetings list,
 * row layout (left → right): time block (64px) → provider icon (12px gap)
 * → title/subtitle (12px gap, flex-grow) → avatar stack (16px gap) → Join
 * button (16px gap) → kebab menu (8px gap). Each gap is an explicit
 * margin on the receiving element (not a blanket flex `gap`) because the
 * five gaps in this row are not uniform (12/12/16/16/8px).
 *
 * Responsive (Phase 11): below `md` (900px) both the avatar stack and
 * the provider icon are hidden, per responsive.md's own priority order
 * ("hide avatar stack and/or provider icon before hiding the Join
 * button or title — title/time/Join are the minimum viable row"). The
 * threshold is `md`, not `sm` (600px): measured with Playwright, the
 * row's real minimum content width only clears the available space
 * from ~700px up with both hidden, so gating the hide at `sm` left a
 * 600–699px gap where the title collapsed to 0 width and disappeared
 * entirely — worse than the spec's own stated floor. `md` (900px) was
 * chosen as the nearest existing breakpoint token clear of that gap
 * with margin to spare, rather than adding a one-off custom value.
 */
export function MeetingRow({ meeting, isLast = false }: MeetingRowProps) {
  const provider = PROVIDER_STYLES[meeting.provider];
  const ProviderIcon = provider.icon;
  const shownAttendees = meeting.attendees.slice(0, VISIBLE_ATTENDEES);
  const overflowCount = meeting.attendees.length - shownAttendees.length;

  return (
    <div className={cn("flex items-center py-4", !isLast && "border-border-divider border-b")}>
      <div className="flex w-16 shrink-0 flex-col gap-0.5">
        <span className="text-ink text-sm font-medium">{formatMeetingTime(meeting.startsAt)}</span>
        <span className="text-ink-muted text-xs">{formatMeetingDay(meeting.startsAt)}</span>
      </div>

      <span className="ml-3 hidden h-6 w-6 shrink-0 items-center justify-center md:inline-flex">
        <ProviderIcon
          className={cn("h-6 w-6", provider.color)}
          aria-hidden="true"
          strokeWidth={1.75}
        />
        <span className="sr-only">{provider.label}</span>
      </span>

      <div className="ml-3 flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-ink truncate text-base font-semibold">{meeting.title}</p>
        {meeting.subtitle ? (
          <p className="text-body-sm text-ink-muted truncate">{meeting.subtitle}</p>
        ) : null}
      </div>

      {/* responsive.md §31 → "Lists": at narrow widths, hide the avatar
          stack before the Join button or title — title/time/Join are the
          minimum viable row. Hidden below `md` (900px), unchanged from
          `md` up (including the validated 1536px reference view). */}
      <div className="ml-4 hidden shrink-0 items-center md:flex">
        {shownAttendees.map((attendee, index) => (
          <Avatar
            key={attendee.id}
            size="sm"
            alt={attendee.name}
            initials={getInitials(attendee.name)}
            className={cn("ring-surface ring-2", index > 0 && "-ml-2")}
          />
        ))}
        {overflowCount > 0 ? (
          <span
            className="ring-surface bg-surface-alt text-ink-muted text-micro -ml-2 flex h-6 w-6 items-center justify-center rounded-full font-semibold ring-2"
            aria-label={`${overflowCount} more attendee${overflowCount === 1 ? "" : "s"}`}
          >
            +{overflowCount}
          </span>
        ) : null}
      </div>

      <Button size="sm" variant="subtle" className="ml-4 w-18 shrink-0">
        Join
      </Button>

      <IconButton
        icon={<MoreVertical className="h-4 w-4" aria-hidden="true" />}
        aria-label={`More options for ${meeting.title}`}
        size="sm"
        variant="ghost"
        className="ml-2 shrink-0"
      />
    </div>
  );
}
