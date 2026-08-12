import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { mockAccount } from "@/data/mock-account";
import { cn } from "@/lib/utils";
import type { Plan } from "@/types/user";

const PLAN_LABELS: Record<Plan, string> = {
  starter: "Starter Plan",
  pro: "Pro Plan",
  business: "Business Plan",
};

export interface SidebarAccountProps {
  /** `true` (default) inside the persistent `SidebarShell`: collapses to
   * an avatar-only, centered trigger in the tablet rail (768–1199px) and
   * regains the full name/plan/chevron row from `lg` (1200px) up, same
   * "one instance spans both tiers" reasoning as `SidebarNavItem`. The
   * mobile drawer passes `false` for an always-full row. */
  railCollapse?: boolean;
}

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
export function SidebarAccount({ railCollapse = true }: SidebarAccountProps) {
  const initial = mockAccount.name.charAt(0).toUpperCase();

  return (
    <AccountMenu
      align="start"
      side="top"
      trigger={
        <button
          type="button"
          aria-label={`Account menu for ${mockAccount.name}`}
          className={cn(
            "focus-visible:ring-brand-800 focus-visible:ring-offset-app border-border hover:bg-surface flex w-full items-center gap-2 rounded-sm border-t pt-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            railCollapse && "justify-center lg:justify-start",
          )}
        >
          <Avatar alt={mockAccount.name} initials={initial} size="md" />
          <span
            className={cn("flex flex-1 flex-col overflow-hidden", railCollapse && "hidden lg:flex")}
          >
            <span className="text-ink truncate text-sm font-semibold">{mockAccount.name}</span>
            <span className="text-micro text-ink-muted truncate">
              {PLAN_LABELS[mockAccount.plan]}
            </span>
          </span>
          <ChevronDown
            className={cn("text-ink-muted h-4 w-4 shrink-0", railCollapse && "hidden lg:block")}
            aria-hidden="true"
          />
        </button>
      }
    />
  );
}
