export interface WelcomeIllustrationProps {
  className?: string;
}

/**
 * Flat-style city skyline for the welcome banner — rebuilt against the
 * project's first real reference screenshot of this exact banner
 * (previously only components.md's text description existed: "3–4
 * buildings, trees, birds, clouds"). The reference shows a noticeably
 * richer scene than that text implied, so this reconstruction adds:
 * a 5-building skyline (short sage cap → peach building with a window
 * grid → a tall cream tower with a pitched roof and vertical window
 * striping → a blue building with its own window grid → a short tan
 * building), two layered/bushy "pom-pom" trees (3 overlapping lobes
 * each, not a single circle), a two-bump outlined cloud pair, and two
 * birds — all sharing one stroke system (var(--color-ink), ~0.65
 * opacity, round caps/joins) instead of the previous single stroked
 * building among otherwise strokeless shapes.
 *
 * Still a deterministic local SVG (no emoji/stock image/external
 * asset), all colors via CSS custom properties — same discipline as
 * before, just with the detail level the reference actually shows.
 * Building count/window layout are a faithful-effort reconstruction
 * from the image, not pixel-sampled coordinates — UNVERIFIED at the
 * sub-pixel level, per this project's standing "don't claim precision
 * that wasn't measured" convention.
 */
export function WelcomeIllustration({ className }: WelcomeIllustrationProps) {
  const stroke = "var(--color-ink)";

  return (
    <svg
      viewBox="0 0 340 160"
      width={340}
      height={160}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* clouds — generic two-bump cloud silhouette, outlined */}
      <g fill="var(--color-surface)" stroke={stroke} strokeOpacity={0.45} strokeWidth={1.4}>
        <path
          d="M18 34c-5.7 0-10.3-4.6-10.3-10.3 0-5.5 4.3-10 9.7-10.3A11.7 11.7 0 0 1 38.2 12a10 10 0 0 1 7.6 9.7c0 5.5-4.5 10-10 10H18Z"
          transform="translate(6 4) scale(1.05)"
        />
        <path
          d="M18 34c-5.7 0-10.3-4.6-10.3-10.3 0-5.5 4.3-10 9.7-10.3A11.7 11.7 0 0 1 38.2 12a10 10 0 0 1 7.6 9.7c0 5.5-4.5 10-10 10H18Z"
          transform="translate(50 15) scale(0.62)"
        />
      </g>

      {/* birds — clear of the clouds and buildings, in open sky */}
      <g stroke={stroke} strokeOpacity={0.55} strokeWidth={1.5} strokeLinecap="round" fill="none">
        <path d="M97 18l6-4.6 6 4.6" />
        <path d="M120 30l5-4 5 4" />
      </g>

      {/* building 1 — short sage cap, partly behind the front trees */}
      <rect
        x="132"
        y="100"
        width="30"
        height="60"
        rx="3"
        fill="var(--color-brand-100)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.4}
      />
      <g fill={stroke} opacity={0.14}>
        <rect x="140" y="110" width="5" height="5" rx="1" />
        <rect x="152" y="110" width="5" height="5" rx="1" />
        <rect x="140" y="122" width="5" height="5" rx="1" />
        <rect x="152" y="122" width="5" height="5" rx="1" />
      </g>

      {/* building 2 — peach, grid windows */}
      <rect
        x="165"
        y="58"
        width="42"
        height="102"
        rx="3"
        fill="var(--color-accent-pink)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />
      <g fill="var(--color-surface)" opacity={0.6}>
        <rect x="174" y="68" width="6" height="6" rx="1.2" />
        <rect x="192" y="68" width="6" height="6" rx="1.2" />
        <rect x="174" y="82" width="6" height="6" rx="1.2" />
        <rect x="192" y="82" width="6" height="6" rx="1.2" />
        <rect x="174" y="96" width="6" height="6" rx="1.2" />
        <rect x="192" y="96" width="6" height="6" rx="1.2" />
        <rect x="174" y="110" width="6" height="6" rx="1.2" />
        <rect x="192" y="110" width="6" height="6" rx="1.2" />
      </g>

      {/* building 3 — tallest, cream tower with a pitched roof + vertical window striping */}
      <path
        d="M210 28h46l-23-16-23 16Z"
        fill="var(--color-surface)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect
        x="210"
        y="28"
        width="46"
        height="132"
        rx="3"
        fill="var(--color-surface)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />
      <g fill={stroke}>
        <rect x="218" y="42" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="230" y="42" width="6" height="9" rx="1.3" opacity={0.08} />
        <rect x="242" y="42" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="218" y="60" width="6" height="9" rx="1.3" opacity={0.08} />
        <rect x="230" y="60" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="242" y="60" width="6" height="9" rx="1.3" opacity={0.08} />
        <rect x="218" y="78" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="230" y="78" width="6" height="9" rx="1.3" opacity={0.08} />
        <rect x="242" y="78" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="218" y="96" width="6" height="9" rx="1.3" opacity={0.08} />
        <rect x="230" y="96" width="6" height="9" rx="1.3" opacity={0.12} />
        <rect x="242" y="96" width="6" height="9" rx="1.3" opacity={0.08} />
      </g>

      {/* building 4 — blue, grid windows */}
      <rect
        x="259"
        y="64"
        width="40"
        height="96"
        rx="3"
        fill="var(--color-accent-blue)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />
      <g fill="var(--color-surface)" opacity={0.4}>
        <rect x="267" y="74" width="6" height="6" rx="1.2" />
        <rect x="285" y="74" width="6" height="6" rx="1.2" />
        <rect x="267" y="90" width="6" height="6" rx="1.2" />
        <rect x="285" y="90" width="6" height="6" rx="1.2" />
        <rect x="267" y="106" width="6" height="6" rx="1.2" />
        <rect x="285" y="106" width="6" height="6" rx="1.2" />
      </g>

      {/* building 5 — short tan cap, rightmost */}
      <rect
        x="302"
        y="90"
        width="34"
        height="70"
        rx="3"
        fill="var(--color-brand-100)"
        stroke={stroke}
        strokeOpacity={0.55}
        strokeWidth={1.4}
      />
      <g fill={stroke} opacity={0.14}>
        <rect x="309" y="100" width="5" height="5" rx="1" />
        <rect x="320" y="100" width="5" height="5" rx="1" />
        <rect x="309" y="114" width="5" height="5" rx="1" />
        <rect x="320" y="114" width="5" height="5" rx="1" />
      </g>

      {/* trees — layered, bushy canopies (3 overlapping lobes), in front of the buildings */}
      <g>
        <line
          x1="118"
          y1="160"
          x2="118"
          y2="143"
          stroke="var(--color-brand-800)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <g fill="var(--color-accent-sage)" stroke={stroke} strokeOpacity={0.5} strokeWidth={1.3}>
          <circle cx="108" cy="132" r="11" />
          <circle cx="128" cy="132" r="11" />
          <circle cx="118" cy="124" r="15" />
        </g>
      </g>
      <g>
        <line
          x1="96"
          y1="160"
          x2="96"
          y2="148"
          stroke="var(--color-brand-800)"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <g fill="var(--color-accent-sage)" stroke={stroke} strokeOpacity={0.5} strokeWidth={1.2}>
          <circle cx="89" cy="144" r="8" />
          <circle cx="103" cy="144" r="8" />
          <circle cx="96" cy="138" r="11" />
        </g>
      </g>
    </svg>
  );
}
