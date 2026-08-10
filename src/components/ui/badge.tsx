import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "success" | "warning" | "brand" | "orange";

// neutral/success/warning/brand: soft or solid status pills for inline
// labels. orange: solid fill matching the header notification count badge
// exactly (components.md: "16×16px circle, orange/red fill, white text").
const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-surface-alt text-ink-muted",
  success: "bg-brand-100 text-brand-800",
  warning: "bg-accent-orange-100 text-accent-orange",
  brand: "bg-brand-800 text-surface",
  orange: "bg-accent-orange text-surface",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/** Small pill/circle used for counters and status labels — e.g. the header
 * notification count in components.md (10px/700 text, 16×16 circle). */
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-2xs inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-bold",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
