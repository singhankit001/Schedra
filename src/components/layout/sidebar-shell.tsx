import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SidebarShellProps {
  /** Purely structural — no assumed gap between children. The sidebar's
   * internal rhythm (logo → nav = 32px, nav → Upgrade card = flexible,
   * Upgrade card → account row = 16px) is non-uniform, so it's composed
   * explicitly by `Sidebar` rather than baked in here. */
  children?: ReactNode;
  className?: string;
}

/**
 * Persistent sidebar container: full shell height, spec padding. See
 * visual-spec/layout.md §2 and components.md → Sidebar.
 *
 * Light/cream surface (`bg-app`), visually continuous with the main
 * content panel rather than a distinct dark panel — corrected against the
 * reference image (see DESIGN_SYSTEM.md, "Sidebar color scheme
 * correction"). `border-r border-border` gives the sidebar/content
 * boundary a subtle seam now that the two panels share a background
 * color, reusing the same border token every card in the app already
 * uses rather than inventing a sidebar-specific one.
 *
 * Responsive: this is the *persistent* sidebar only — below `tablet`
 * (768px) it doesn't render at all (`hidden`); mobile gets the off-canvas
 * `MobileSidebarDrawer` instead, opened from the header hamburger. From
 * `tablet` up it's always on screen, first as an 80px icon-only rail
 * (`w-sidebar-rail`, tighter `p-4`), then the exact original 264px
 * labeled sidebar (`lg:w-sidebar`, `lg:p-6`) from `lg` (1200px) — the
 * validated desktop value, unchanged.
 */
export function SidebarShell({ children, className }: SidebarShellProps) {
  return (
    <aside
      className={cn(
        "w-sidebar-rail bg-app border-border tablet:flex lg:w-sidebar hidden h-full shrink-0 flex-col border-r p-4 lg:p-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}
