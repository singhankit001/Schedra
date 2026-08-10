import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatAccent, StatCardData, TrendDirection } from "@/lib/stats";

// components.md → Stat card: "Upcoming Meetings → ... cream/neutral badge",
// "Pending Invitations → ... peach badge", "Hours Booked → ... pale-green
// badge", "Revenue → ... orange badge". colors.md's accent table assigns
// `orange-400` to both Pending Invitations and Revenue; components.md
// describes them as two different shades. Resolved in favor of
// components.md's distinction (documented in DESIGN_SYSTEM.md): peach uses
// the lighter `orange-100` tint, orange uses the stronger `accent-orange`.
const ACCENT_STYLES: Record<StatAccent, { background: string; icon: string }> = {
  neutral: { background: "bg-app", icon: "text-ink" },
  peach: { background: "bg-accent-orange-100", icon: "text-accent-orange" },
  sage: { background: "bg-brand-100", icon: "text-brand-800" },
  orange: { background: "bg-accent-orange", icon: "text-surface" },
};

const TREND_ICON: Record<TrendDirection, typeof ArrowUp> = {
  up: ArrowUp,
  down: ArrowDown,
};

// Positive trends read green (brand-600) per typography.md; a "down" style
// isn't evidenced in the reference, but a negative-trend card is a
// realistic future case, so it's handled defensibly rather than assumed
// away — this is the one un-sampled value in this component.
const TREND_COLOR: Record<TrendDirection, string> = {
  up: "text-brand-600",
  down: "text-danger",
};

export interface StatCardProps {
  stat: StatCardData;
}

/**
 * Single KPI card. components.md → Stat card: 40×40 circular icon badge,
 * label 16px below it, value 4px below the label, trend row 8px below the
 * value. Built on the `Card` primitive with its defaults (`padding="md"`
 * = 20px, `radius="lg"` = 16px) — both already match the spec exactly, no
 * extension needed.
 */
export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;
  const TrendIcon = TREND_ICON[stat.trend.direction];
  const accent = ACCENT_STYLES[stat.accent];

  return (
    <Card className="flex min-h-35 flex-col">
      <span
        className={cn("flex h-10 w-10 items-center justify-center rounded-full", accent.background)}
      >
        <Icon className={cn("h-5 w-5", accent.icon)} aria-hidden="true" strokeWidth={2} />
      </span>

      <p className="text-label text-ink-muted mt-4">{stat.label}</p>
      <p className="text-kpi text-ink mt-1">{stat.value}</p>

      <div className="mt-2 flex items-center gap-1">
        <TrendIcon
          className={cn("h-3 w-3", TREND_COLOR[stat.trend.direction])}
          aria-hidden="true"
          strokeWidth={2.5}
        />
        <span className={cn("text-caption", TREND_COLOR[stat.trend.direction])}>
          {stat.trend.delta}
        </span>
        <span className="text-caption text-ink-muted">{stat.trend.period}</span>
      </div>
    </Card>
  );
}
