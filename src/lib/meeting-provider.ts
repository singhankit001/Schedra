import { Video, type LucideIcon } from "lucide-react";
import type { MeetingProvider } from "@/types/meeting";

export interface MeetingProviderStyle {
  icon: LucideIcon;
  color: string;
  label: string;
}

// No literal Google Meet/Zoom/Microsoft Teams logos are reproduced here
// (trademarked marks, and the reference only shows a generic glyph per
// components.md's own wording: "Google Meet / Zoom / Teams brand glyph").
// Each provider instead gets the same neutral `Video` glyph tinted with
// the accent color colors.md already assigns to that platform (blue-400
// for the Zoom-style icon, purple-400 for Teams) — a deterministic, legally
// safe stand-in per Phase 6's brief preference for local placeholders over
// anything resembling a real brand asset.
//
// Extracted from `meeting-row.tsx` (Phase 6) in Phase 9 so `ScheduleItem`
// (Today's Schedule) can reuse the exact same mapping instead of
// duplicating it — qa-checklist.md requires Today's Schedule show "the
// same 4 events as Upcoming Meetings, mirrored correctly," so the two
// components should render identical provider glyphs/colors by
// construction, not by two independently-maintained copies.
export const PROVIDER_STYLES: Record<MeetingProvider, MeetingProviderStyle> = {
  "google-meet": { icon: Video, color: "text-brand-600", label: "Google Meet" },
  zoom: { icon: Video, color: "text-accent-blue", label: "Zoom" },
  "microsoft-teams": { icon: Video, color: "text-accent-purple", label: "Microsoft Teams" },
};
