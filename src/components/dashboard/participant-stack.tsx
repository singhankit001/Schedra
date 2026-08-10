import { Avatar } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import type { Contact } from "@/types/contact";

export interface ParticipantStackProps {
  participants: Contact[];
  /** How many avatars to show before collapsing the rest into a "+N"
   * chip. components.md → Upcoming Meetings: "up to 2 shown". */
  visibleCount?: number;
  className?: string;
}

/**
 * Reusable overlapping avatar stack — extracted from `MeetingRow`
 * (Phase 6) so `ScheduleItem`, the `/meetings` list, and meeting-details
 * modal can all share one implementation instead of duplicating the
 * slice/overflow-chip logic.
 *
 * Avatars use `Avatar`'s existing `initials` fallback, not photographic
 * images — no external avatar API/hotlinked photos, per the standing,
 * documented Phase 6 decision (no real personal data, no remote image
 * dependency for fabricated attendees). Each participant's name is
 * always available as accessible text via `Avatar`'s required `alt`.
 */
export function ParticipantStack({
  participants,
  visibleCount = 2,
  className,
}: ParticipantStackProps) {
  const shown = participants.slice(0, visibleCount);
  const overflow = participants.length - shown.length;

  if (participants.length === 0) return null;

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((participant, index) => (
        <Avatar
          key={participant.id}
          size="sm"
          alt={participant.name}
          initials={getInitials(participant.name)}
          className={cn("ring-surface ring-2", index > 0 && "-ml-2")}
        />
      ))}
      {overflow > 0 ? (
        <span
          className="ring-surface bg-surface-alt text-ink-muted text-micro -ml-2 flex h-6 w-6 items-center justify-center rounded-full font-semibold ring-2"
          aria-label={`${overflow} more participant${overflow === 1 ? "" : "s"}`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}
