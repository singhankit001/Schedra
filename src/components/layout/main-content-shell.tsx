import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MainContentShellProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Scrollable main content region: cream surface, flexes to fill remaining
 * shell width, spec padding. See visual-spec/layout.md §3-4.
 *
 * Padding is `p-8` (32px) from `md` (900px) up — the exact, validated
 * desktop value, unchanged at the 1536px reference viewport — and `p-5`
 * (20px) below that, per responsive.md's "Typography & spacing scaling":
 * "adjusting layout density (padding 32px → 20px, gaps 24px → 16px)
 * below md."
 */
export function MainContentShell({ children, className }: MainContentShellProps) {
  return (
    <main
      className={cn("bg-app flex h-full flex-1 flex-col overflow-y-auto p-5 md:p-8", className)}
    >
      {children}
    </main>
  );
}
