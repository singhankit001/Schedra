# MeetPlan — Responsive Behavior Specification

The reference screenshot shows a single desktop breakpoint (1536×1024,
effectively a ~1504px app viewport). No tablet/mobile state is present in
the source. The behavior below is inferred from standard dashboard
patterns implied by the existing grid — flag these as **assumptions**, not
observed fact, and confirm with product/design before building.

## 31. Responsive behavior

### Breakpoint strategy (inferred)
| Breakpoint | Range | Behavior |
|---|---|---|
| `xl` (reference) | ≥1440px | Exact layout as specified: 264px sidebar + two-column content (776/376 split) |
| `lg` | 1200–1439px | Sidebar stays fixed 264px; right column narrows proportionally (min 320px) before columns stack; stat cards may drop to 2 per row wrapping to 2 rows |
| `md` | 900–1199px | Right column (Calendar / Today's Schedule / New Meeting) stacks **below** left column instead of beside it; stat cards go to a 2×2 grid; meeting-type cards go to 2×2 |
| `sm` | 600–899px | Sidebar collapses to icon-only rail (e.g., 72px, labels hidden/tooltip-on-hover) or becomes an off-canvas drawer behind a hamburger trigger in the header; single-column stacked content; stat cards 2×2 or 1-per-row |
| `xs` | <600px | Sidebar fully off-canvas (drawer/overlay); header search collapses to icon-triggered overlay; all sections single column, full-bleed cards; list rows drop secondary meta (avatars stack, Join button may shrink to icon-only) |

### Sidebar
- Fixed width at desktop; **not** part of the reference's responsive
  proof, so collapse behavior (icon rail vs. drawer) is an implementation
  choice — recommend icon-rail collapse ≥768px, drawer below.

### Grid reflow
- The 776/376 two-column split is a fixed-ratio flex row at desktop; at
  narrower widths it should become `flex-direction: column`, right-column
  content stacking beneath left-column content in reading order: Banner →
  Calendar → Stats → Upcoming Meetings → Today's Schedule → New Meeting →
  Meeting Types (i.e., calendar/schedule/CTA move under, not interleaved).

### Cards
- Stat cards and Meeting-Type cards use `grid-template-columns:
  repeat(4, 1fr)` at desktop; recommend `repeat(2, 1fr)` at `md`, `1fr`
  at `xs`, with gap held at 16px throughout.

### Lists
- Upcoming Meetings rows: at narrow widths, hide avatar stack and/or
  provider icon before hiding the Join button or title — title/time/Join
  are the minimum viable row.
- Today's Schedule: timeline dot/line rail should remain visible at all
  sizes; event card content wraps rather than truncates where possible.

### Typography & spacing scaling
- No fluid type scale evidenced; recommend holding font sizes fixed
  across breakpoints (per `typography.md`) and only adjusting layout
  density (padding 32px → 20px, gaps 24px → 16px) below `md`.

### Not observed / needs product input before build
- Mobile nav pattern (drawer vs. bottom tab bar).
- Whether search becomes icon-only on small screens.
- Whether the welcome-banner illustration hides below a width threshold.
- Empty/loading/error states for any list or card.
