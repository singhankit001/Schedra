# MeetPlan — Component Specification

Full inventory of every visible UI component, its structure, and its exact
sizing tokens. Cross-reference `layout.md`, `colors.md`, `typography.md`,
`spacing.md` for shared tokens.

---

## Sidebar

### Logo / wordmark
- Icon: calendar glyph in a rounded square, **32×32px**, brand green fill,
  white check/date mark.
- Wordmark "MeetPlan" — 18px/700, white text, 8px gap from icon.
- Row height: 32px, sits at top of sidebar with 24px top padding.

### Nav item (×10: Dashboard, Meetings, Calendar, Availability, Meeting
Types, Contacts, Analytics, Integrations, Team, Billing, Settings)
- Full-width row within sidebar padding: **216 × 40px**.
- Border radius: **10px**.
- Icon: **20×20px**, left-aligned, 12px gap to label.
- Label: 14px/500.
- **Active state** (Dashboard): filled background `surface-nav-active`
  (#1D3E2C), white icon+label, subtle left accent not present (relies on
  fill only).
- **Inactive state**: transparent bg, muted green-gray icon/label
  (~`#9FB3A6`), hover state presumed to lighten bg slightly (not directly
  observable, inferred).

### Upgrade-to-Pro promo card
- Width: 216px (sidebar content width), height: **~180px**.
- Border radius: **16px**.
- Background: slightly lighter dark-green tint or bordered card within
  sidebar (`#12301F` approx), 16px internal padding.
- Illustration: potted plant + calendar icon, ~64×64px, centered top.
- Title: "Upgrade to Pro" — 14px/600, white.
- Subtext: "Unlock advanced features and grow your business." — 12px/400,
  muted, 2 lines.
- Button "Upgrade Now": full-width (184px), height 36px, radius 8px,
  brand-green-on-lighter or white bg with green text (inverted from card),
  14px/600 label.

### Account footer row
- Height: 56px, top border/divider separating from nav.
- Avatar: 32×32 circle, initials "A".
- Name "Account" 13px/600 + plan "Starter Plan" 11px/400 stacked, 8px gap
  from avatar.
- Chevron icon (expand): 16×16, right-aligned.

---

## Header
- Search input: **384×44px**, radius **10px**, white bg, 1px subtle
  border, magnifier icon (16×16) at 16px left inset, placeholder text
  14px/400 muted, `⌘K` kbd-hint chip right-aligned inside field (2px
  padding, 4px radius, muted bg).
- Notification bell button: **40×40px** circle/rounded-square, radius
  10px, white bg, bell icon 18×18 centered, badge (top-right corner,
  **16×16px** circle, orange/red fill, white "3" 10px/700) offset −4px/−4px.
- Avatar (user): **40×40px** circle, photo fill, **8×8px** green
  online-status dot bottom-right with 2px white ring border.

---

## Welcome banner
- Container: 776×~208px, radius 20px, background gradient/solid warm
  cream-to-peach, no border, soft shadow.
- Text block (left-aligned, vertically centered):
  - "Good Morning," — 16px/400, dark charcoal.
  - "Welcome back! 👋" — 28px/700, dark charcoal, emoji inline at end.
  - "You have **8** meetings today." — 14px/400, muted, with the number
    bolded/orange-accented inline.
- Illustration (right side): flat-style city skyline — 3–4 buildings
  (pink/cream/blue fills), trees, birds, clouds — approx 340×160px,
  anchored bottom-right, slight bleed past container edge.

---

## Mini calendar widget
- Container: 376×~375px, radius 20px, white surface, 1px border, 24px
  padding.
- Header row: "May 2025" 16px/600 left, `‹` `›` chevron buttons right
  (24×24px each, 8px gap, circular hover target).
- Weekday header: 7 columns, labels "SUN…SAT" 11px/500 uppercase, muted,
  centered per column, row height 24px.
- Date grid: 6×7 cells, each **~48×36px**, date number centered 13px/400.
  - Dates outside current month: muted/faded text (~40% opacity).
  - Dates with events: small **4px** dot centered below the number,
    brand-green fill.
  - Selected date (20): filled circle **32×32px**, brand-green bg (#163C2C),
    white bold text.
- Footer: "📅 View full calendar" link, 13px/500, brand-green text, icon
  14×14, 16px top margin, sits at container bottom.

---

## Stat card (×4)
- Container: 182×~140px, radius 16px, white surface, 1px border, 20px
  padding, subtle shadow.
- Icon badge: **40×40px** circle, tinted background per card (see
  `colors.md` → Accent colors), glyph icon 20×20 centered:
  - Upcoming Meetings → calendar icon, cream/neutral badge.
  - Pending Invitations → people icon, peach badge.
  - Hours Booked → clock icon, pale-green badge.
  - Revenue → ₹/$ icon, orange badge.
- Label: 13px/500, muted, 16px below badge.
- Value: 28px/700, dark charcoal, directly below label (4px gap).
- Trend row: `↑ 12%` in green 12px/500 + `vs yesterday` muted 12px/400,
  8px below value.

---

## Upcoming Meetings list
- Container: 776×~320px, radius 16px, white surface, 1px border, 20px
  padding.
- Header row: "Upcoming Meetings" 18px/600 left, "View all" 13px/500
  brand-green link right.
- Row (×4, ~64px tall, 1px bottom divider except last):
  - Time block (~64px wide): "09:30 AM" 13px/500 + "Today" 12px/400 muted,
    stacked.
  - Provider icon: **24×24px** (Google Meet / Zoom / Teams brand glyph),
    12px gap after time block.
  - Title/subtitle block (flex-grow): title 14px/600, subtitle 13px/400
    muted, stacked 2px gap.
  - Avatar stack: **24×24px** circles, −8px overlap, up to 2 shown + "+N"
    overflow chip (24×24, muted bg, 11px/600 text).
  - "Join" button: **72×32px**, radius 8px, pale-green bg, brand-green
    text 13px/600.
  - Kebab menu: 24×24px, 3-dot icon, far right.

---

## Today's Schedule (timeline)
- Container: 376×~320px, radius 16px, white surface, 1px border, 20px
  padding.
- Header row: "Today's Schedule" 18px/600 left, "See full day" 13px/500
  brand-green link right.
- Timeline (×4 rows, ~64px each):
  - Left rail: time label (13px/500, ~56px wide) + **2px** vertical
    connector line + **8px** dot (brand-green fill) marking each event.
  - Event card (flex-grow): white/cream surface, radius 12px, 12px
    padding, containing provider icon (24×24), title 14px/600, subtitle
    13px/400 muted, kebab menu (20×20) top-right of card.

---

## New Meeting CTA
- Button: **376×48px** (full right-column width), radius 12px, solid
  brand-green fill (#163C2C), white text.
- Content: "+" icon 16×16 + 8px gap + "New Meeting" 14px/600, centered.
- Sits directly beneath Today's Schedule, 16px gap.

---

## Your Meeting Types (×4 cards)
- Header row (above cards): "Your Meeting Types" 18px/600 left, "Manage
  all" 13px/500 brand-green link right, 16px margin to cards.
- Card: 182×~108px, radius 16px, white surface, 1px border, 16px padding.
  - Icon badge: **40×40px** circle, tinted per type (video icon peach,
    video icon peach, monitor icon blue, people icon pink).
  - Kebab menu: 20×20, top-right corner.
  - Title: 14px/600, 2-line max, 12px below icon.
  - Meta: "30 mins • One-on-One" 12px/400 muted, 4px below title.
  - Divider or spacing, then footer row: link icon 14×14 + "Copy link"
    12px/500 brand-green, kebab icon 16×16 far right (secondary, smaller
    than card corner one — reference shows one kebab per card, verify
    single vs. double on build).

---

## 26. Icon sizes (summary)
| Context | Size |
|---|---|
| Sidebar logo glyph | 32×32 |
| Sidebar nav icons | 20×20 |
| Header search/bell icons | 16–18px |
| Stat card icon badges (container) | 40×40 (glyph 20×20) |
| Meeting-type icon badges (container) | 40×40 (glyph 20×20) |
| Provider icons (Meet/Zoom/Teams) in lists | 24×24 |
| Kebab (more) menu | 20×24 |
| Chevrons (calendar nav, account expand) | 16×16 |
| Link/copy icons | 14×14 |
| Calendar event dot | 4×4 |
| Timeline dot | 8×8 |

## 27. Avatar dimensions
| Context | Size |
|---|---|
| Header user avatar | 40×40, circle, 8×8 status dot |
| Sidebar account avatar | 32×32, circle |
| Meeting-row attendee avatars | 24×24, circle, −8px stacked overlap |
| Overflow chip ("+2") | 24×24, circle, muted bg |

## 28. Button dimensions
| Button | Size | Radius |
|---|---|---|
| New Meeting (primary CTA) | 376×48 | 12px |
| Upgrade Now (sidebar) | 184×36 | 8px |
| Join (list row) | 72×32 | 8px |
| Calendar nav chevrons | 24×24 | full/circle |
| Kebab menu buttons | 24×24 | full/circle |
| Search input (as control) | 384×44 | 10px |

## Border radius scale (24)
| Token | Value | Usage |
|---|---|---|
| `radius-xs` | 8px | small buttons, badges |
| `radius-sm` | 10px | search input, nav items, icon buttons |
| `radius-md` | 12px | New Meeting CTA, schedule event cards |
| `radius-lg` | 16px | stat cards, list containers, meeting-type cards |
| `radius-xl` | 20px | welcome banner, calendar widget, Upgrade card |
| `radius-2xl` | 24px | app shell |
| `radius-full` | 999px | avatars, dots, badges |
