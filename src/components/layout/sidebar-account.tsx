import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AccountMenu } from "@/components/dashboard/account-menu";
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
 * a clickable row would be invalid HTML and a confusing focus target.
 * Wrapped in the same `AccountMenu` the header avatar uses (Profile,
 * Account settings, Sign out) — one real dropdown, two trigger points,
 * not two separate implementations.
 */
export function SidebarAccount() {
  const initial = mockAccount.name.charAt(0).toUpperCase();

  return (
    <AccountMenu
      align="start"
      side="top"
      trigger={
        <button
          type="button"
          aria-label={`Account menu for ${mockAccount.name}`}
          className="focus-visible:ring-brand-800 focus-visible:ring-offset-app border-border hover:bg-surface flex w-full items-center gap-2 rounded-sm border-t pt-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Avatar alt={mockAccount.name} initials={initial} size="md" />
          <span className="flex flex-1 flex-col overflow-hidden">
            <span className="text-ink truncate text-sm font-semibold">{mockAccount.name}</span>
            <span className="text-micro text-ink-muted truncate">
              {PLAN_LABELS[mockAccount.plan]}
            </span>
          </span>
          <ChevronDown className="text-ink-muted h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      }
    />
  );
}
