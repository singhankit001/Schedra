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
 * Fixed-width sidebar container: full shell height, spec padding. See
 * visual-spec/layout.md §2 and components.md → Sidebar.
 *
 * Light/cream surface (`bg-app`), visually continuous with the main
 * content panel rather than a distinct dark panel — corrected against the
 * reference image (see DESIGN_SYSTEM.md, "Sidebar color scheme
 * correction"). `border-r border-border` gives the sidebar/content
 * boundary a subtle seam now that the two panels share a background
 * color, reusing the same border token every card in the app already
 * uses rather than inventing a sidebar-specific one.
 */
export function SidebarShell({ children, className }: SidebarShellProps) {
  return (
    <aside
      className={cn(
        "w-sidebar bg-app border-border flex h-full shrink-0 flex-col border-r p-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}
