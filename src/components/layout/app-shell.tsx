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
 */
export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className="bg-canvas flex min-h-screen w-full items-center justify-center p-4">
      <div
        className={cn(
          "shadow-shell flex h-[calc(100vh-2rem)] w-full max-w-[1504px] overflow-hidden rounded-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
