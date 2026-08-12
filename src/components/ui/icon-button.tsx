import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";
export type IconButtonVariant = "solid" | "ghost";
export type IconButtonShape = "circle" | "square";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  /** Required — icon-only buttons have no visible text, so an accessible
   * name must always be supplied explicitly. */
  "aria-label": string;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  /** Defaults per size follow the reference: kebab menus and calendar
   * chevrons (sm/md) are circular, the header bell (lg) is a rounded
   * square. Override explicitly for a different combination. */
  shape?: IconButtonShape;
}

// components.md §28: kebab menu + calendar nav chevrons = 24×24, radius
// full. Header notification bell = 40×40, radius-sm (10px). 32px (md) has
// no direct reference match and is kept as a flexible middle tier. `xs`
// (20×24) is a Phase 7 addition — the meeting-type card's corner kebab is
// explicitly called out at 20×20 in both layout.md §12 and components.md's
// meeting-type section, overriding the generic 24×24 kebab default for
// that one component-level case (see DESIGN_SYSTEM.md).
const sizeStyles: Record<IconButtonSize, string> = {
  xs: "h-5 w-5", // 20px — meeting-type card kebab
  sm: "h-6 w-6", // 24px — kebab menu, calendar chevrons
  md: "h-8 w-8", // 32px — flexible middle tier
  lg: "h-10 w-10", // 40px — header bell
};

const defaultShapeForSize: Record<IconButtonSize, IconButtonShape> = {
  xs: "circle",
  sm: "circle",
  md: "circle",
  lg: "square",
};

const shapeStyles: Record<IconButtonShape, string> = {
  circle: "rounded-full",
  square: "rounded-sm",
};

const variantStyles: Record<IconButtonVariant, string> = {
  solid: "border border-border bg-surface text-ink hover:bg-surface-alt",
  ghost: "bg-transparent text-ink-muted hover:bg-surface-alt hover:text-ink",
};

// `xs`/`sm` (20/24px) are below a comfortable touch target — `tap-area`
// (globals.css) invisibly extends their hit area by 8px/side for
// touch/pointer hit-testing without changing the validated visual size.
const touchSlopSizes: IconButtonSize[] = ["xs", "sm"];

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, size = "md", variant = "ghost", shape, className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center transition-colors",
        "focus-visible:ring-brand-800 focus-visible:ring-offset-app focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        sizeStyles[size],
        shapeStyles[shape ?? defaultShapeForSize[size]],
        variantStyles[variant],
        touchSlopSizes.includes(size) && "tap-area",
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
});
