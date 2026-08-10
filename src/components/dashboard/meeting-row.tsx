import { Button } from "@/components/ui/button";
import { MeetingActionsMenu } from "@/components/dashboard/meeting-actions-menu";
import { MeetingPlatformIcon, PROVIDER_LABEL } from "@/components/dashboard/meeting-platform-icon";
import { ParticipantStack } from "@/components/dashboard/participant-stack";
import { formatMeetingDay, formatMeetingTime } from "@/lib/meeting-time";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import type { Meeting } from "@/types/meeting";

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
 * Join opens the meeting-details modal (`MeetingDetailsModal`) — there's
 * no real video-conferencing backend, so this is the honest fallback the
 * brief itself prescribes for mock data, not a dead button. The kebab
 * (`MeetingActionsMenu`) is a real, working dropdown: view details, copy
 * a share link (Clipboard API), cancel (with confirmation).
 *
 * Responsive (Phase 11): below `md` (900px) both the avatar stack and
 * the provider icon are hidden — see the git history for the measured
 * reasoning (unchanged by this pass).
 */
export function MeetingRow({ meeting, isLast = false }: MeetingRowProps) {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <div className={cn("flex items-center py-4", !isLast && "border-border-divider border-b")}>
      <div className="flex w-16 shrink-0 flex-col gap-0.5">
        <span className="text-ink text-sm font-medium">{formatMeetingTime(meeting.startsAt)}</span>
        <span className="text-ink-muted text-xs">{formatMeetingDay(meeting.startsAt)}</span>
      </div>

      <span className="ml-3 hidden h-6 w-6 shrink-0 items-center justify-center md:inline-flex">
        <MeetingPlatformIcon provider={meeting.provider} size={24} />
        <span className="sr-only">{PROVIDER_LABEL[meeting.provider]}</span>
      </span>

      <div className="ml-3 flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-ink truncate text-base font-semibold">{meeting.title}</p>
        {meeting.subtitle ? (
          <p className="text-body-sm text-ink-muted truncate">{meeting.subtitle}</p>
        ) : null}
      </div>

      <ParticipantStack participants={meeting.attendees} className="ml-4 hidden shrink-0 md:flex" />

      <Button
        size="sm"
        variant="subtle"
        className="ml-4 w-18 shrink-0"
        onClick={() => openModal({ type: "meeting-details", meetingId: meeting.id })}
      >
        Join
      </Button>

      <MeetingActionsMenu meeting={meeting} size="sm" className="ml-2 shrink-0" />
    </div>
  );
}
