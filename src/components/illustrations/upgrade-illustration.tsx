export interface UpgradeIllustrationProps {
  className?: string;
}

/**
 * Small decorative mark for the sidebar Upgrade-to-Pro card: a potted
 * plant with a calendar badge, per components.md → Upgrade-to-Pro promo
 * card: "Illustration: potted plant + calendar icon, ~64×64px, centered
 * top." Kept deliberately simple/schematic — Phase 3's own match-list for
 * the Upgrade card doesn't require pixel-matching the artwork, and no
 * image file exists in-repo to sample it from. All colors are design
 * tokens (via CSS custom properties), no hardcoded hex.
 */
export function UpgradeIllustration({ className }: UpgradeIllustrationProps) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* pot */}
      <path
        d="M20 46h24l-3 12.2a4 4 0 0 1-3.9 3.3H26.9a4 4 0 0 1-3.9-3.3L20 46Z"
        fill="var(--color-accent-sage)"
      />
      {/* leaves */}
      <path d="M32 46c0-10-8-14-14-14 0 9 6 14 14 14Z" fill="var(--color-brand-600)" />
      <path d="M32 46c0-12 9-17 16-17 0 10-7 17-16 17Z" fill="var(--color-brand-100)" />
      <path d="M32 46V26" stroke="var(--color-brand-800)" strokeWidth={2} strokeLinecap="round" />
      {/* calendar badge */}
      <circle cx="46" cy="44" r="12" fill="var(--color-surface)" />
      <g
        transform="translate(38.5,36.5)"
        stroke="var(--color-brand-800)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="0" y="1.5" width="15" height="13" rx="2" />
        <path d="M4 0v3M11 0v3M0 6.5h15" />
        <path d="M4.5 10.5l2 2 4-4" />
      </g>
    </svg>
  );
}
