import { Calendar, Clock, DollarSign, Users, type LucideIcon } from "lucide-react";

/** Named accent roles for the stat-card icon badges. Kept as semantic keys
 * rather than Tailwind classes so this data module stays presentation-free —
 * `StatCard` owns the key → token mapping. */
export type StatAccent = "neutral" | "peach" | "sage" | "orange";

export type TrendDirection = "up" | "down";

export interface StatTrend {
  direction: TrendDirection;
  /** Pre-formatted percentage, e.g. "12%". */
  delta: string;
  /** Comparison period, e.g. "vs yesterday". */
  period: string;
}

export interface StatCardData {
  id: string;
  label: string;
  /** Pre-formatted for display (currency symbol, decimals, separators
   * already applied) — real data can format upstream without changing
   * the card. */
  value: string;
  icon: LucideIcon;
  accent: StatAccent;
  trend: StatTrend;
}

/**
 * Local presentation data for the four KPI cards, matching the reference /
 * qa-checklist exactly: Upcoming Meetings (8), Pending Invitations (3),
 * Hours Booked (24.5), Revenue (₹24,680). No API or backend exists yet —
 * isolated here so real statistics can replace this module without
 * touching `StatCard`/`DashboardStats`.
 *
 * Icon glyphs follow components.md's descriptions (calendar / people /
 * clock / currency) but the exact Lucide glyph is a semantic best-fit —
 * the spec names the concept, not the icon. The Revenue badge glyph is
 * `DollarSign`, corrected against the reference image (previously
 * `IndianRupee`, inferred from the printed value's "₹" symbol — the
 * reference's actual icon glyph is a generic dollar sign even though the
 * printed value is in rupees; see DESIGN_SYSTEM.md). The printed value
 * itself is untouched. Badge tints follow colors.md; see DESIGN_SYSTEM.md
 * for the peach-vs-orange resolution.
 */
export const STAT_CARDS: StatCardData[] = [
  {
    id: "upcoming-meetings",
    label: "Upcoming Meetings",
    value: "8",
    icon: Calendar,
    accent: "neutral",
    trend: { direction: "up", delta: "12%", period: "vs yesterday" },
  },
  {
    id: "pending-invitations",
    label: "Pending Invitations",
    value: "3",
    icon: Users,
    accent: "peach",
    trend: { direction: "up", delta: "8%", period: "vs yesterday" },
  },
  {
    id: "hours-booked",
    label: "Hours Booked",
    value: "24.5",
    icon: Clock,
    accent: "sage",
    trend: { direction: "up", delta: "18%", period: "vs last week" },
  },
  {
    id: "revenue",
    label: "Revenue",
    value: "₹24,680",
    icon: DollarSign,
    accent: "orange",
    trend: { direction: "up", delta: "15%", period: "vs last month" },
  },
];
