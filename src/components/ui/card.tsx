import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";
export type CardRadius = "lg" | "xl";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  radius?: CardRadius;
}

// spacing.md §31: meeting-type card 16px, stat card / list container 20px,
// calendar widget 24px, welcome banner 32px.
const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4", // 16px
  md: "p-5", // 20px
  lg: "p-6", // 24px
  xl: "p-8", // 32px
};

// components.md radius scale: stat/list/meeting-type cards = 16px (lg);
// calendar widget / welcome banner / upgrade card = 20px (xl).
const radiusStyles: Record<CardRadius, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export function Card({ padding = "md", radius = "lg", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface shadow-card border",
        radiusStyles[radius],
        paddingStyles[padding],
        className,
      )}
      {...props}
    />
  );
}
