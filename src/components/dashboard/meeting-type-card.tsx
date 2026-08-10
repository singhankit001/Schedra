import { Link2, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import type { MeetingFormat } from "@/types/meeting-type";
import type { MeetingTypeAccent, MeetingTypeCardData } from "@/data/mock-meeting-types";

// Card 1 (Consultation) uses a neutral/cream badge, matching the
// reference image and the same `bg-app`/`text-ink` treatment StatCard
// uses for its own "neutral" accent (Upcoming Meetings card) — corrected
// from an earlier "peach" reading of components.md's text description,
// see DESIGN_SYSTEM.md. `peach` has a dedicated pale token
// (`accent-orange-100`, reused verbatim from StatCard). `accent-blue` has
// no separate tint variant, so its badge background uses the same token
// at 15% alpha (Tailwind's built-in color-opacity modifier, not a new
// color value) to read as a pastel badge rather than a saturated block.
// `accent-pink` (`#F6DDE0`) is already pale by design (colors.md samples
// it from the banner illustration), so it's used as-is for the badge
// background; with no darker pink token to pair as the glyph color,
// `text-ink` (charcoal) is used instead — see DESIGN_SYSTEM.md.
const ACCENT_STYLES: Record<MeetingTypeAccent, { background: string; icon: string }> = {
  neutral: { background: "bg-app", icon: "text-ink" },
  peach: { background: "bg-accent-orange-100", icon: "text-accent-orange" },
  blue: { background: "bg-accent-blue/15", icon: "text-accent-blue" },
  pink: { background: "bg-accent-pink", icon: "text-ink" },
};

const FORMAT_LABEL: Record<MeetingFormat, string> = {
  "one-on-one": "One-on-One",
  group: "Group",
};

export interface MeetingTypeCardProps {
  data: MeetingTypeCardData;
}

/**
 * Single "Your Meeting Types" card. components.md → meeting-type card:
 * 40×40 icon badge + 20×20 kebab share the top row, title 12px below
 * (2-line clamp), meta 4px below title, "Copy link" row 12px below meta.
 * Built on `Card` (`padding="sm"` = 16px, `radius="lg"` = 16px — both
 * already match the spec with zero extension, same reuse as `StatCard`).
 */
export function MeetingTypeCard({ data }: MeetingTypeCardProps) {
  const { meetingType, icon: Icon, accent } = data;
  const accentStyle = ACCENT_STYLES[accent];

  return (
    <Card padding="sm" className="flex min-h-27 flex-col">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            accentStyle.background,
          )}
        >
          <Icon className={cn("h-5 w-5", accentStyle.icon)} aria-hidden="true" strokeWidth={2} />
        </span>
        <IconButton
          icon={<MoreVertical className="h-3.5 w-3.5" aria-hidden="true" />}
          aria-label={`More options for ${meetingType.name}`}
          size="xs"
          variant="ghost"
        />
      </div>

      <p className="text-ink mt-3 line-clamp-2 text-base font-semibold">{meetingType.name}</p>
      <p className="text-ink-muted mt-1 text-xs">
        {meetingType.durationMinutes} mins &bull; {FORMAT_LABEL[meetingType.format]}
      </p>

      {/* Bespoke, not built on `Button` — the reference shows a plain
          inline icon+text control (no button chrome/padding/fixed
          height), which `Button`'s size scale doesn't represent. No
          clipboard behavior wired up (consistent with Join/kebab/"View
          all" elsewhere in the app not having real behavior yet). */}
      <button
        type="button"
        className="text-caption text-brand-800 focus-visible:ring-brand-800 focus-visible:ring-offset-surface mt-3 inline-flex w-fit items-center gap-1.5 rounded-xs hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
        Copy link
      </button>
    </Card>
  );
}
