"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";
import { cn } from "@/lib/utils";

export interface SidebarNavigationProps {
  className?: string;
  /** Forwarded to every `SidebarNavItem` — see its own doc comment.
   * Defaults `true` (persistent sidebar); the mobile drawer passes
   * `false` for always-visible labels. */
  railCollapse?: boolean;
}

/**
 * Client component: needs `usePathname()` to derive the active item from
 * the current route rather than a hardcoded flag. spacing.md: 4px gap
 * between nav items.
 */
export function SidebarNavigation({ className, railCollapse = true }: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={cn("flex flex-col gap-1", className)}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={isActive}
            railCollapse={railCollapse}
          />
        );
      })}
    </nav>
  );
}
