# MeetPlan — Layout Specification

Reference: single screenshot, canvas **1536 × 1024px**. All values below are
derived from visual measurement of that reference, normalized to an **8px
base grid** for implementation consistency. Treat as best-estimate
engineering values, not extracted design-tool metadata — verify against the
source image during the QA pass (see `qa-checklist.md`).

## 1. Overall page / canvas
- Canvas: **1536 × 1024px** (reference viewport).
- Outer background: solid dark green (`#0B1F14`-range, see `colors.md`)
  visible as a **16px margin** on all four sides of the app shell — reads as
  window chrome / frame, not app content.
- App shell ("card"): **1504 × 992px**, positioned at `(16, 16)`.
  - Border radius: **24px**.
  - Subtle outer shadow (see `colors.md` → Shadows).
  - Contains two regions: Sidebar (left) + Main content (right), full height.

## 2. Sidebar width
- Width: **264px** (fixed, does not scale with content).
- Height: full shell height, **992px**.
- Background: dark green, flush with the shell's left/top/bottom edges
  (shares the shell's 24px radius on its outer corners only).
- Internal horizontal padding: **24px**.
- Internal vertical padding: **24px** top, **24px** bottom.

## 3. Main content dimensions
- Width: **1240px** (`1504 − 264`).
- Height: **992px** (full shell height).
- Background: warm off-white/cream, flush against sidebar's right edge.
- Shares the shell's 24px radius on its outer corners (top-right,
  bottom-right).

## 4. Content padding
- Main content inner padding: **32px** on all four sides (top, right,
  bottom, left).
- Usable content box: **1176 × 928px**.
- Inter-section vertical gap (between stacked rows: header → banner row →
  stats row → lists row → meeting-types row): **24px**.
- Inter-column horizontal gap (left column vs. right column): **24px**.

## 5. Grid structure
Two-column asymmetric grid inside the content box:

| Column | Width | Role |
|---|---|---|
| Left | **776px** (~66%) | Welcome banner, stat cards, Upcoming Meetings, Your Meeting Types |
| Gap | 24px | — |
| Right | **376px** (~32%) | Mini calendar, Today's Schedule, New Meeting CTA |

Header row spans the full 1176px content width above both columns.

Vertical stack (top → bottom), each separated by 24px:
1. Header row (search + notifications + avatar) — full width, 44px tall
2. Banner (left col) / Calendar (right col) row — ~208px
3. Stat cards (left col only) — ~140px — right col: calendar continues
4. Upcoming Meetings (left) / Today's Schedule (right) — ~300–330px, bottom-aligned across columns
5. New Meeting CTA (right col only, sits directly under Today's Schedule)
6. Your Meeting Types (left col, full 776px) — ~110px, row of 4 cards

## 6. Header dimensions
- Height: **44–48px**.
- Layout: `justify-content: space-between`.
- Left: Search input, width **384px**, height **44px**.
- Right cluster: notification bell (40×40) + avatar (40×40), **16px** gap
  between them.

## 7. Welcome banner dimensions
- Width: **776px** (full left column).
- Height: **~200–208px**.
- Border radius: **20px**.
- Internal padding: **32px** left, **28px** top/bottom.
- Illustration (city skyline) anchored right, roughly **340×160px**,
  bleeding toward the banner's right/bottom edge.

## 8. Statistics card dimensions
- 4 cards, equal width, in left column (776px):
  - Card width: **(776 − 3×16) / 4 = 182px**.
  - Gap between cards: **16px**.
  - Card height: **~140px**.
- Border radius: **16px**.
- Internal padding: **20px**.
- Icon badge (top-left of card): **40×40px** circle.
- Value label baseline sits ~16px below the icon badge.
- Delta/trend text sits at card bottom, ~8px below value.

## 9. Calendar dimensions
- Width: **376px** (full right column).
- Height: **~370–380px** (spans banner row + stat-card row height on the
  left column).
- Border radius: **20px**.
- Internal padding: **24px**.
- Header row (month label + prev/next chevrons): height **32px**.
- Day-of-week label row: height **24px**, 7 equal columns (~48px each).
- Date grid: 6 rows × 7 columns, each cell **~48×40px**, date number
  centered, small **4px** dot beneath dates that have events.
- Selected date: filled dark-green circle, **32px** diameter.
- Footer link ("View full calendar"): height **20px**, **16px** top margin
  from grid.

## 10. Upcoming meetings dimensions
- Width: **776px** (left column).
- Height: **~300–330px** container (scroll/clip if content overflows).
- Border radius: **16px**.
- Section header row (title + "View all" link): height **28px**, **16px**
  margin below to first list row.
- List rows: **4 visible rows**, each row height **~64px**, separated by a
  **1px** hairline divider.
- Row internal layout (left → right): time block (~64px) → provider icon
  (24×24) → title/subtitle text block (flex) → avatar stack (24×24 each,
  −8px overlap) → "Join" button (72×32px) → kebab menu (24×24).

## 11. Today's schedule dimensions
- Width: **376px** (right column).
- Height: matches Upcoming Meetings section, **~300–330px**.
- Border radius: **16px**.
- Section header row (title + "See full day" link): height **28px**.
- Timeline rows: **4 visible rows**, each **~64px** tall, left edge has a
  **2px** vertical connector line with an **8px** dot per row, time label
  to the left of the dot (~64px wide), event card to the right (white
  surface, radius 12px, padding 12px) containing provider icon (24×24),
  title, subtitle, and kebab menu.

## 12. Meeting type dimensions
- Row width: **776px** (left column, full width).
- 4 cards, equal width: **(776 − 3×16) / 4 = 182px** each, **16px** gaps.
- Card height: **~104–110px**.
- Border radius: **16px**.
- Internal padding: **16px**.
- Icon badge: **40×40px** circle, top-left.
- Kebab menu: top-right, 20×20px.
- Title: 2 lines max, below icon.
- Meta row (duration • type): below title.
- "Copy link" row: bottom of card, small link icon (14×14) + label.

## 13. CTA dimensions
- "New Meeting" button (right column, below Today's Schedule):
  - Width: **376px** (full right column).
  - Height: **48px**.
  - Border radius: **12px** (pill-leaning rounded rect).
  - Icon: **16×16 "+"** + 8px gap + label, centered.
- "Upgrade Now" button (sidebar):
  - Width: **216px** (sidebar width minus 24px×2 padding).
  - Height: **40px**.
  - Border radius: **10px**.
- "Join" buttons (Upcoming Meetings rows): **72×32px**, radius **8px**.

## Component inventory (visible elements)
- Sidebar: logo/wordmark, 10 nav items (1 active), Upgrade-to-Pro promo
  card with illustration + CTA, account row (avatar + name + plan + chevron).
- Header: search input w/ icon + `⌘K` hint, notification bell w/ count
  badge, user avatar w/ online-status dot.
- Welcome banner: greeting text (2-line), subtext, decorative illustration.
- Mini calendar widget: month nav, weekday labels, date grid, "view full
  calendar" link.
- 4 stat cards: Upcoming Meetings, Pending Invitations, Hours Booked,
  Revenue — each icon + label + big number + trend delta.
- Upcoming Meetings list (4 rows) with "View all" link.
- Today's Schedule timeline (4 rows) with "See full day" link.
- New Meeting primary CTA button.
- Your Meeting Types (4 cards) with "Manage all" link.
