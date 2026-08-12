import { cn } from "@/lib/utils";

export interface SchedraMarkProps {
  size?: number;
  className?: string;
}

/**
 * Standalone brand glyph — a calendar with a check mark, hand-drawn as a
 * plain deterministic SVG rather than imported from Lucide, so the mark
 * stays a dedicated brand asset independent of the icon library used for
 * navigation. Geometry follows components.md → Sidebar → Logo/wordmark:
 * "calendar glyph ... white check/date mark."
 */
export function SchedraMark({ size = 18, className }: SchedraMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
      <path d="M8.5 14.5l2.25 2.25L15.5 12.25" />
    </svg>
  );
}

export interface SchedraLogoProps {
  className?: string;
  /** Extra classes for the wordmark span only — the collapsed sidebar
   * rail (tablet, 768–1199px) passes `"hidden lg:inline"` so the same
   * lockup reads as icon-only in the rail and gains its label back at the
   * full desktop sidebar width, with no separate "compact logo"
   * component. Every other call site (mobile drawer, anywhere else)
   * leaves this unset and always gets the full lockup. */
  wordmarkClassName?: string;
}

/**
 * Sidebar brand lockup: icon mark + "Schedra" wordmark.
 * components.md → Sidebar → Logo/wordmark: 32×32 icon, 18px/700 wordmark,
 * 8px gap. The icon square keeps its solid brand-green fill + white glyph
 * unchanged (matches the reference exactly); the wordmark is dark ink,
 * not white — corrected against the reference image, which shows the
 * sidebar as a light surface. See DESIGN_SYSTEM.md.
 */
export function SchedraLogo({ className, wordmarkClassName }: SchedraLogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="bg-brand-800 text-surface flex h-8 w-8 shrink-0 items-center justify-center rounded-xs">
        <SchedraMark size={18} />
      </span>
      <span className={cn("text-wordmark text-ink", wordmarkClassName)}>Schedra</span>
    </span>
  );
}
