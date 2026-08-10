# MeetPlan — Typography Specification

Typeface reads as a clean geometric/humanist sans-serif consistent with
**Inter** (or a close system equivalent — SF Pro / Segoe UI style metrics).
Recommend `Inter` as the implementation font with system-ui fallback.

```css
font-family: "Inter", -apple-system, "Segoe UI", Roboto, sans-serif;
```

## 14. Typography hierarchy (largest → smallest)
1. Welcome banner headline ("Welcome back!")
2. Stat card big numbers ("8", "3", "24.5", "₹24,680")
3. Section headings ("Upcoming Meetings", "Today's Schedule", "Your
   Meeting Types", calendar month "May 2025")
4. Sidebar wordmark ("MeetPlan")
5. Card/row titles ("Design Review", "Product Demo", meeting-type names)
6. Body / row subtitles, nav item labels, button labels
7. Meta text (timestamps, "vs yesterday", "30 mins • One-on-One")
8. Micro labels (day-of-week letters, badge counts)

## 15–18. Font sizes, weights, line heights, letter spacing

| Element | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Welcome banner "Welcome back!" | 28px | 700 (Bold) | 1.2 | 0 |
| Welcome banner "Good Morning," | 16px | 400 (Regular) | 1.4 | 0 |
| Welcome banner subtext | 14px | 400 (Regular) | 1.5 | 0 |
| Stat card value ("8", "₹24,680") | 28px | 700 (Bold) | 1.2 | −0.01em |
| Stat card label ("Upcoming Meetings") | 13px | 500 (Medium) | 1.4 | 0 |
| Stat card trend delta ("↑ 12% vs yesterday") | 12px | 500 (Medium) | 1.4 | 0 |
| Section heading ("Upcoming Meetings" etc.) | 18px | 600 (Semibold) | 1.3 | 0 |
| "View all" / "See full day" / "Manage all" links | 13px | 500 (Medium) | 1.4 | 0 |
| Sidebar wordmark "MeetPlan" | 18px | 700 (Bold) | 1.2 | −0.01em |
| Sidebar nav item label | 14px | 500 (Medium) | 1.4 | 0 |
| List row title ("Design Review") | 14px | 600 (Semibold) | 1.4 | 0 |
| List row subtitle ("Team Sync") | 13px | 400 (Regular) | 1.4 | 0 |
| List row time ("09:30 AM") | 13px | 500 (Medium) | 1.3 | 0 |
| "Today" (secondary time label) | 12px | 400 (Regular) | 1.3 | 0 |
| Button label ("Join", "New Meeting") | 14px | 600 (Semibold) | 1 | 0 |
| Calendar month label ("May 2025") | 16px | 600 (Semibold) | 1.3 | 0 |
| Calendar weekday labels (SUN–SAT) | 11px | 500 (Medium) | 1.3 | 0.04em (uppercase tracked) |
| Calendar date numbers | 13px | 400/600 (600 if selected) | 1.3 | 0 |
| Meeting-type card title | 14px | 600 (Semibold) | 1.3 | 0 |
| Meeting-type meta ("30 mins • One-on-One") | 12px | 400 (Regular) | 1.4 | 0 |
| "Copy link" label | 12px | 500 (Medium) | 1.3 | 0 |
| Search placeholder | 14px | 400 (Regular) | 1.4 | 0 |
| Notification badge count | 10px | 700 (Bold) | 1 | 0 |
| Account name / plan (sidebar footer) | 13px / 11px | 600 / 400 | 1.3 | 0 |

## General rules
- Headings and buttons use Semibold–Bold (600–700); body/meta text stays
  Regular–Medium (400–500) — no Light weights observed anywhere.
- Uppercase tracked text is limited to calendar weekday abbreviations.
- No italics observed anywhere in the design.
- Numeric figures (stat values, currency) use tabular/lining numerals for
  alignment.
