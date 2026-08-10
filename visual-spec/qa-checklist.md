# MeetPlan — Implementation QA Checklist

Use this to verify a built implementation against the reference screenshot
(1536×1024). Check off each item against a side-by-side diff (implementation
screenshot vs. reference), not from memory.

## Methodology note
Values in `layout.md`/`spacing.md`/`components.md` are best-estimate
measurements from a single static image, normalized to an 8px grid. Before
sign-off, re-measure the built UI against the reference at 100% zoom using
an overlay/diff tool (e.g., browser devtools ruler, Figma overlay, or pixel
diff) and correct any token that visibly drifts by >4px.

## Structure
- [ ] App shell has 16px dark-canvas margin on all sides, 24px corner radius
- [ ] Sidebar is exactly 264px wide, full height, dark green background
- [ ] Main content panel fills remaining width (1240px), cream background
- [ ] Main content has 32px padding on all four sides
- [ ] Two-column grid: left 776px / gap 24px / right 376px
- [ ] Row order top-to-bottom matches: Header → Banner+Calendar → Stats →
      Upcoming Meetings + Today's Schedule → New Meeting CTA → Meeting Types
- [ ] All inter-row gaps are 24px; intra-card gaps 16px

## Sidebar
- [ ] Logo glyph + "MeetPlan" wordmark present, correct size/weight
- [ ] All 10 nav items present in correct order with correct icons
- [ ] Dashboard nav item shows active/filled state; all others inactive
- [ ] Upgrade-to-Pro card present with illustration, copy, and CTA button
- [ ] Account footer row shows avatar, "Account", "Starter Plan", chevron

## Header
- [ ] Search input left-aligned, placeholder text + ⌘K hint visible
- [ ] Notification bell right-aligned with red/orange badge showing "3"
- [ ] User avatar with green online-status dot, right-most element

## Welcome banner
- [ ] "Good Morning," + "Welcome back! 👋" text present, correct hierarchy
- [ ] "You have 8 meetings today." subtext with number emphasized
- [ ] City-skyline illustration present, right-anchored, not clipped
- [ ] Banner background is warm cream/peach, not flat white

## Calendar widget
- [ ] Month label "May 2025" with working-looking prev/next chevrons
- [ ] 7-column weekday header (SUN–SAT)
- [ ] Full 6-row date grid, correct days for May 2025
- [ ] Event dots appear under dates that have meetings
- [ ] Date "20" shown as selected (filled green circle)
- [ ] "View full calendar" link present at bottom

## Stat cards
- [ ] Exactly 4 cards: Upcoming Meetings (8), Pending Invitations (3),
      Hours Booked (24.5), Revenue (₹24,680)
- [ ] Each has a distinct tinted icon badge matching reference
- [ ] Trend delta text present and colored green with up-arrow
- [ ] Equal card widths, 16px gaps, consistent height

## Upcoming Meetings
- [ ] Section header + "View all" link
- [ ] 4 rows: Design Review, Product Demo, Interview – UX Designer, Sales Call
- [ ] Each row has time, provider icon (matches meeting's video platform),
      title, subtitle, avatar(s), Join button, kebab menu
- [ ] Row dividers present between rows
- [ ] Avatar overflow chip ("+2", "+1") renders where applicable

## Today's Schedule
- [ ] Section header + "See full day" link
- [ ] Timeline rail with connector line + dot per row
- [ ] Same 4 events as Upcoming Meetings, mirrored correctly
- [ ] Kebab menu present per event card

## New Meeting CTA
- [ ] Full-width button under Today's Schedule, "+ New Meeting" label
- [ ] Solid brand-green fill, white text, correct radius

## Your Meeting Types
- [ ] Section header + "Manage all" link
- [ ] 4 cards: 30 Min Consultation, 60 Min Strategy Call, Quick Demo,
      Interview Session
- [ ] Each card shows icon badge, title, duration/type meta, "Copy link" row
- [ ] Icon badge tint varies per card, matching reference colors

## Color & type fidelity
- [ ] Primary brand green matches reference (not a generic Tailwind green)
- [ ] Cream/off-white background is warm, not pure white or gray
- [ ] Font is a geometric/humanist sans (Inter or equivalent), not serif
      or a mismatched system font
- [ ] Heading weights are Semibold/Bold; body text Regular/Medium only
- [ ] No unintended color drift on hover/focus states vs. static reference

## Spacing & alignment
- [ ] Left column content (banner, stats, list, meeting types) shares a
      consistent 776px left edge/width
- [ ] Right column content (calendar, schedule, CTA) shares a consistent
      376px left edge/width, flush with content's right edge
- [ ] No unintended text clipping, icon misalignment, or overflow at
      reference resolution

## Sign-off
- [ ] Side-by-side screenshot diff at 1536×1024 shows no structural
      discrepancies
- [ ] All values in this spec have been reconciled with the actual build;
      any intentional deviations are documented with rationale
