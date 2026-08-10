import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { mockAccount } from "@/data/mock-account";
import type { Plan } from "@/types/user";

const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter Plan",
  pro: "Pro Plan",
  business: "Business Plan",
};

/**
 * Account footer row. components.md → Sidebar → Account footer row: 32px
 * avatar, "Account" 13px/600 + "Starter Plan" 11px/400 stacked, 16×16
 * chevron, top divider.
 *
 * A single `<button>` for the whole row (not a div with a nested
 * icon-button for the chevron) — nesting an interactive icon-button inside
 * a clickable row would be invalid HTML and a confusing focus target. No
 * menu is wired up yet (out of scope), so it's a focusable, correctly
 * labeled control with no-op interaction for now, ready for a later phase.
 *
 * Text/divider/focus colors corrected against the reference image (see
 * DESIGN_SYSTEM.md, "Sidebar color scheme correction") — `text-ink`/
 * `text-ink-muted`/`border-border` are the same tokens used for this
 * exact name/meta/divider pattern everywhere else in the app; `Avatar`
 * itself is untouched (its `brand-100`/`brand-800` fallback already read
 * correctly on a light surface, same as the header avatar).
 */
export function SidebarAccount() {
  const initial = mockAccount.name.charAt(0).toUpperCase();

  return (
    <button
      type="button"
      aria-label={`Account menu for ${mockAccount.name}`}
      className="focus-visible:ring-brand-800 focus-visible:ring-offset-app border-border hover:bg-surface flex w-full items-center gap-2 rounded-sm border-t pt-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <Avatar alt={mockAccount.name} initials={initial} size="md" />
      <span className="flex flex-1 flex-col overflow-hidden">
        <span className="text-ink truncate text-sm font-semibold">{mockAccount.name}</span>
        <span className="text-micro text-ink-muted truncate">{PLAN_LABELS[mockAccount.plan]}</span>
      </span>
      <ChevronDown className="text-ink-muted h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  );
}
