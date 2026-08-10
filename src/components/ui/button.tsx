import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// components.md: solid brand fill — "New Meeting", "Upgrade Now".
// secondary: bordered white surface — general secondary actions (no
// bordered button is shown in the reference; inferred from surface tokens).
// ghost: text-only until hover — low-emphasis actions.
// subtle: tinted brand fill — matches the "Join" button exactly (pale-green
// bg, brand-green text).
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-800 text-surface hover:bg-brand-900 active:bg-brand-900",
  secondary: "border border-border bg-surface text-ink hover:bg-surface-alt",
  ghost: "bg-transparent text-ink hover:bg-surface-alt",
  subtle: "bg-brand-100 text-brand-800 hover:bg-brand-100/70",
};

// Heights/radii are the three evidenced button sizes. Join and New Meeting
// are unambiguous (components.md §28 / layout.md §13 agree: 32px/8px and
// 48px/12px). Upgrade Now had a genuine conflict between the two files —
// resolved here in favor of components.md's 184×36/radius-8: that value
// falls out of the Upgrade card's own explicit 16px padding (216 card
// width − 16px×2 = 184px button width), while layout.md's 216×40/radius-10
// reads as having conflated the card's width with the button's. See
// DESIGN_SYSTEM.md → "Decisions outside the spec" for the full reasoning.
// This is a Phase 3 correction of the Phase 2 resolution, which had
// initially picked layout.md's numbers.
const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 rounded-xs px-4", // Join
  md: "h-9 rounded-xs px-4", // Upgrade Now
  lg: "h-12 rounded-md px-5", // New Meeting
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    className,
    type,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(
        // typography.md: all button labels are 14px/600/leading-none,
        // regardless of button size.
        "text-button inline-flex items-center justify-center gap-2 transition-colors",
        "focus-visible:ring-brand-800 focus-visible:ring-offset-app focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
