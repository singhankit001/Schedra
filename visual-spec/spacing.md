# MeetPlan — Spacing Specification

Base unit: **8px grid** (4px used for fine micro-adjustments only — badge
paddings, dot sizes, icon-to-label gaps).

## 29. Vertical rhythm
| Location | Value |
|---|---|
| Shell outer margin (canvas → app shell) | 16px |
| Main content outer padding (top/bottom) | 32px |
| Header row → Banner/Calendar row | 24px |
| Banner/Calendar row → Stat cards row | 24px |
| Stat cards row → Upcoming Meetings/Today's Schedule row | 24px |
| Today's Schedule → New Meeting CTA | 16px |
| Upcoming Meetings/Schedule row → Your Meeting Types row | 24px |
| Sidebar: logo block → nav list | 32px |
| Sidebar: nav item → nav item | 4px (each item ~44px tall incl. padding) |
| Sidebar: nav list → Upgrade card | 24px (pushed via flex, sits above account footer) |
| Sidebar: Upgrade card → account footer row | 16px |
| Stat card: icon badge → value | 16px |
| Stat card: value → trend delta | 8px |
| Section header → first list row | 16px |
| List row → list row | 0 (divider-separated, row itself includes ~16px vertical padding) |
| Calendar: header → weekday row | 16px |
| Calendar: weekday row → date grid | 8px |
| Calendar: date grid → footer link | 16px |
| Meeting-type card: icon → title | 12px |
| Meeting-type card: title → meta row | 4px |
| Meeting-type card: meta row → copy-link row | 12px |

## 30. Horizontal spacing
| Location | Value |
|---|---|
| Sidebar internal padding (left/right) | 24px |
| Main content internal padding (left/right) | 32px |
| Left column ↔ right column gap | 24px |
| Stat cards: gap between the 4 cards | 16px |
| Meeting-type cards: gap between the 4 cards | 16px |
| List row: time block → icon | 12px |
| List row: icon → title/subtitle block | 12px |
| List row: title block → avatar stack | 16px |
| List row: avatar stack → Join button | 16px |
| List row: Join button → kebab menu | 8px |
| Avatar stack: overlap between avatars | −8px (24px avatar, 16px visible step) |
| Header: search input → bell icon | flexible (space-between); bell → avatar | 16px |
| Nav item: icon → label | 12px |
| Button: icon → label (New Meeting, Upgrade Now) | 8px |

## 31. Component internal padding
| Component | Padding |
|---|---|
| Stat card | 20px all sides |
| Welcome banner | 32px left, 28px top/bottom, illustration bleeds right |
| Calendar widget | 24px all sides |
| Upcoming Meetings / Today's Schedule container | 20px all sides |
| Meeting-type card | 16px all sides |
| Search input | 12px vertical / 16px horizontal |
| "Join" button | 6px vertical / 16px horizontal |
| "New Meeting" / "Upgrade Now" button | 12px vertical / 20px horizontal |
| Nav item (sidebar) | 10px vertical / 12px horizontal |
| Notification badge | 2px (tight, circular) |

## Grid summary (content box = 1176px wide)
```
32 | [ Left column: 776px ]  24  [ Right column: 376px ] | 32
```
`776 + 24 + 376 = 1176` ✓ matches main content usable width
(`1240 − 32 − 32 = 1176`).

Stat / meeting-type card row math (4 cards across 776px):
```
(776 − 16×3) / 4 = 182px per card
```
