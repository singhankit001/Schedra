import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AppShellProps {
  /** Expected to be a `SidebarShell` followed by a `MainContentShell`. */
  children: ReactNode;
  className?: string;
}

/**
 * Outer application frame: the dark canvas margin + rounded, shadowed shell
 * that houses the sidebar and main content regions side by side.
 *
 * Structural only — see visual-spec/layout.md §1-3. Sizing/content for the
 * sidebar and main content live in `SidebarShell` / `MainContentShell`.
 *
 * Responsive: the floating, margined "card" chrome (16px canvas margin,
 * 24px radius, shadow) is a desktop/tablet affordance — unchanged from
 * `tablet` (768px) up, byte-identical to the original at any width that
 * matters for desktop preservation. Below `tablet`, the shell goes
 * edge-to-edge (no margin, no radius, no shadow): a phone-width screen has
 * no room to read a dark canvas margin as "window chrome," and a
 * scheduling app should read as a native full-bleed screen there, not a
 * shrunk desktop window. `100dvh` (both tiers) rather than `100vh` so
 * mobile browser chrome (address bar show/hide) doesn't jump the layout.
 */
export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="bg-canvas tablet:p-4 flex h-[100dvh] w-full items-center justify-center">
      <div
        className={cn(
          "shadow-shell tablet:h-[calc(100dvh-2rem)] tablet:max-w-[1504px] tablet:rounded-2xl flex h-[100dvh] w-full overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
