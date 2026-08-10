import { Monitor, Users, Video, type LucideIcon } from "lucide-react";
import type { MeetingType } from "@/types/meeting-type";

/** Named accent roles for the meeting-type icon badges — kept as semantic
 * keys rather than Tailwind classes so this stays presentation-free, same
 * split as `StatAccent`/`STAT_CARDS` (`src/lib/stats.ts`). `neutral`
 * added in the final visual correction pass — see DESIGN_SYSTEM.md. */
export type MeetingTypeAccent = "neutral" | "peach" | "blue" | "pink";

export interface MeetingTypeCardData {
  /** Reuses the Phase 1 `MeetingType` domain schema (`src/types/`) instead
   * of a parallel shape — swapping this for a real booking-page API later
   * only requires replacing this array, not `MeetingTypeCard`. */
  meetingType: MeetingType;
  icon: LucideIcon;
  accent: MeetingTypeAccent;
}

/**
 * Placeholder "Your Meeting Types" cards (Phase 7). No backend/booking
 * integration exists yet. Titles match qa-checklist.md exactly: 30 Min
 * Consultation, 60 Min Strategy Call, Quick Demo, Interview Session.
 *
 * Icon/tint per card, corrected against the actual reference image (see
 * DESIGN_SYSTEM.md's "Final visual correction pass" — components.md's
 * text description, "video icon peach, video icon peach, monitor icon
 * blue, people icon pink," turned out not to match card 1's real tint):
 * Consultation is a neutral/cream badge, Strategy Call is peach, Quick
 * Demo is monitor/blue (colors.md explicitly confirms: "blue-400 ...
 * 'Quick Demo' meeting-type icon badge tint"), Interview Session is
 * people/pink.
 *
 * Only the first two cards' durations are spec-given (in their own
 * titles). Quick Demo (30 min • Group) and Interview Session (45 min •
 * One-on-One) were corrected against the reference image — previously
 * invented values (15 min • One-on-One / 45 min • Group), flagged as
 * unsampled in the Phase 7 completion report, now confirmed wrong for
 * both fields on Quick Demo and the format on Interview Session.
 */
export const MEETING_TYPE_CARDS: MeetingTypeCardData[] = [
  {
    meetingType: {
      id: "consultation-30",
      name: "30 Min Consultation",
      durationMinutes: 30,
      format: "one-on-one",
      bookingUrl: "https://meetplan.app/book/consultation-30",
    },
    icon: Video,
    accent: "neutral",
  },
  {
    meetingType: {
      id: "strategy-call-60",
      name: "60 Min Strategy Call",
      durationMinutes: 60,
      format: "one-on-one",
      bookingUrl: "https://meetplan.app/book/strategy-call-60",
    },
    icon: Video,
    accent: "peach",
  },
  {
    meetingType: {
      id: "quick-demo",
      name: "Quick Demo",
      durationMinutes: 30,
      format: "group",
      bookingUrl: "https://meetplan.app/book/quick-demo",
    },
    icon: Monitor,
    accent: "blue",
  },
  {
    meetingType: {
      id: "interview-session",
      name: "Interview Session",
      durationMinutes: 45,
      format: "one-on-one",
      bookingUrl: "https://meetplan.app/book/interview-session",
    },
    icon: Users,
    accent: "pink",
  },
];
