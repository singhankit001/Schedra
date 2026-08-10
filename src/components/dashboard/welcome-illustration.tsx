export interface WelcomeIllustrationProps {
  className?: string;
}

/**
 * Flat-style city skyline for the welcome banner. components.md → Welcome
 * banner: "flat-style city skyline — 3–4 buildings (pink/cream/blue
 * fills), trees, birds, clouds — approx 340×160px, anchored bottom-right."
 *
 * A deterministic local SVG (no emoji/stock image/external asset), kept
 * to flat silhouettes — no window/texture detail beyond what's visible at
 * banner scale. All colors are design tokens via CSS custom properties.
 */
export function WelcomeIllustration({ className }: WelcomeIllustrationProps) {
  return (
    <svg
      viewBox="0 0 340 160"
      width={340}
      height={160}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* clouds */}
      <g fill="var(--color-surface)" opacity={0.6}>
        <ellipse cx="48" cy="26" rx="20" ry="10" />
        <ellipse cx="65" cy="22" rx="14" ry="8" />
      </g>

      {/* birds — clear of the clouds and buildings, in open sky */}
      <g stroke="var(--color-ink-muted)" strokeWidth={1.5} strokeLinecap="round" fill="none">
        <path d="M120 20l6-4.5 6 4.5" />
        <path d="M142 34l5-4 5 4" />
      </g>

      {/* back building */}
      <rect
        x="195"
        y="15"
        width="58"
        height="145"
        rx="4"
        fill="var(--color-surface)"
        stroke="var(--color-brand-800)"
        strokeOpacity={0.15}
      />
      <g fill="var(--color-brand-800)" opacity={0.12}>
        <rect x="205" y="30" width="10" height="10" rx="1.5" />
        <rect x="225" y="30" width="10" height="10" rx="1.5" />
        <rect x="205" y="50" width="10" height="10" rx="1.5" />
        <rect x="225" y="50" width="10" height="10" rx="1.5" />
      </g>

      {/* blue building */}
      <rect x="255" y="45" width="52" height="115" rx="4" fill="var(--color-accent-blue)" />
      <g fill="var(--color-surface)" opacity={0.25}>
        <rect x="264" y="58" width="9" height="9" rx="1.5" />
        <rect x="280" y="58" width="9" height="9" rx="1.5" />
        <rect x="264" y="76" width="9" height="9" rx="1.5" />
        <rect x="280" y="76" width="9" height="9" rx="1.5" />
      </g>

      {/* pink building (front-left) */}
      <rect x="145" y="78" width="48" height="82" rx="4" fill="var(--color-accent-pink)" />

      {/* pale-green building (front-right) */}
      <rect x="300" y="95" width="38" height="65" rx="4" fill="var(--color-brand-100)" />

      {/* trees */}
      <line x1="120" y1="160" x2="120" y2="145" stroke="var(--color-brand-800)" strokeWidth={3} />
      <circle cx="120" cy="137" r="14" fill="var(--color-accent-sage)" />
      <line x1="99" y1="160" x2="99" y2="151" stroke="var(--color-brand-800)" strokeWidth={3} />
      <circle cx="99" cy="145" r="10" fill="var(--color-accent-sage)" />
    </svg>
  );
}
