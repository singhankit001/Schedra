import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/lib/navigation";

export interface SidebarNavItemProps {
  item: NavigationItem;
  isActive: boolean;
}

/**
 * Single nav row. components.md → Sidebar → Nav item: 216×40px (full
 * sidebar content width, handled by the flex-col parent stretching this
 * link), rounded-sm (10px), 20px icon with 12px gap to a 14px/500 label.
 *
 * Active: solid `bg-brand-800` fill, white icon+label — the same brand
 * green used everywhere else (New Meeting CTA, Upgrade Now, selected
 * calendar date), not a sidebar-specific shade. Inactive: transparent,
 * `text-ink-muted` icon+label (the same muted tone body text uses
 * elsewhere in the app, since the sidebar is now a light surface), subtle
 * `bg-surface` hover fill. Corrected against the reference image — see
 * DESIGN_SYSTEM.md, "Sidebar color scheme correction".
 */
export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      prefetch={item.implemented ? undefined : false}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-nav flex h-10 w-full items-center gap-3 rounded-sm px-3 transition-colors",
        "focus-visible:ring-brand-800 focus-visible:ring-offset-app focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isActive ? "bg-brand-800 text-surface" : "text-ink-muted hover:bg-surface hover:text-ink",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" strokeWidth={2} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}
