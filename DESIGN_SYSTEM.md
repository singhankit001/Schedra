# MeetPlan Design System

Implementation notes for the token layer and UI primitives. **The
authoritative visual reference is `visual-spec/*.md`** — this file explains
how those specs are implemented in code and how to consume them; it does
not restate every measurement.

All tokens live in one place: [`src/app/globals.css`](src/app/globals.css)'s
`@theme` block (raw tokens) plus a block of `@utility` typography classes
right below it. Everything else in the codebase consumes those tokens —
nothing duplicates a raw hex/px value that a token already covers.

## Color tokens

Semantic names over `visual-spec/colors.md` values:

| Token                                                                   | Value                     | Use                                                                                                                          |
| ----------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `bg-canvas`                                                             | `#0B1F14`                 | outer window background                                                                                                      |
| `bg-app`                                                                | `#F8F5EF`                 | main content panel **and the sidebar** (both are one continuous light surface — see "Sidebar color scheme correction" below) |
| `bg-surface` / `text-surface` / `border-surface`                        | `#FFFFFF`                 | cards, inputs, list rows, the Upgrade card                                                                                   |
| `bg-surface-alt`                                                        | `#FCFAF6`                 | hover/tint surface                                                                                                           |
| `bg-brand-900/800/600/100`                                              | green scale               | see below                                                                                                                    |
| `bg-accent-orange`, `-orange-100`, `-blue`, `-purple`, `-pink`, `-sage` | pastel accents            | icon badges, illustration fills only — never body text or large surfaces                                                     |
| `border-border`, `border-border-divider`                                | `#ECE7DC`, `#EFEAE0`      | card borders, list dividers, the sidebar/content seam                                                                        |
| `text-ink`, `text-ink-muted`                                            | `#1B1F1C`, `#8A8478`      | primary / secondary text, **including sidebar text** (no separate sidebar text tone anymore)                                 |
| `bg-danger`, `text-danger`, `bg-danger-100`                             | `#C4432C`, tint `#F7E4DE` | **not in visual-spec** — see [Decisions](#decisions-outside-the-spec)                                                        |

**Brand green** is one scale, used consistently:
`brand-800` (`#163C2C`) is _the_ primary/CTA color — the active sidebar
nav pill, the Upgrade Now button, and the New Meeting CTA all use this
exact shade, not a separate sidebar-specific one. `brand-900` is the
hover-darken target for `brand-800`; `#0E2A1D`, the same hex the old
`bg-sidebar` token held before the sidebar's background moved to
`bg-app`. `brand-600` (`#2F8F5B`) is success/trend/online-status.
`brand-100` is the palest tint, used for icon badges and the `subtle`
button variant.

Never reach for a raw hex or a stock Tailwind color (`bg-green-600`,
`text-gray-500`, ...) when a semantic token already covers the case.

## Typography

Font: **Inter**, self-hosted via `next/font/google` in
[`src/app/layout.tsx`](src/app/layout.tsx) with `display: "swap"` and a
size-matched fallback — no layout shift on load.

Two layers:

1. **Raw size tokens** (`text-2xs` … `text-2xl`) — pure font-size +
   line-height pairs, an escape hatch for one-off tuning.
2. **Semantic utilities** — the ones components should actually reach for,
   each bundling size + weight + line-height + letter-spacing for one named
   role in the hierarchy:

| Utility         | Maps to (typography.md)                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `text-display`  | Welcome banner headline — 28/700/1.2                                                                                     |
| `text-kpi`      | Stat values — 28/700/1.2, `-0.01em` tracking                                                                             |
| `text-wordmark` | Sidebar "MeetPlan" — 18/700/1.2, `-0.01em` tracking                                                                      |
| `text-heading`  | Section headings (also stands in for "page heading" — the spec has no distinct larger page-title style yet) — 18/600/1.3 |
| `text-body`     | Default body text — 14/400/1.4                                                                                           |
| `text-body-sm`  | Secondary body / row subtitles — 13/400/1.4                                                                              |
| `text-nav`      | Nav item labels — 14/500/1.4                                                                                             |
| `text-label`    | Stat labels, "View all"-style links — 13/500/1.4                                                                         |
| `text-caption`  | Meta text, trend deltas — 12/500/1.4                                                                                     |
| `text-button`   | All button labels — 14/600, `leading-none`                                                                               |
| `text-overline` | Calendar weekday caps — 11/500/1.3, `0.04em` tracking, uppercase                                                         |

Letter-spacing is **never** baked into a shared size token — only into the
specific semantic utility that needs it (`text-kpi`, `text-wordmark`,
`text-overline`). `text-2xl` on its own carries no tracking, precisely so a
future banner headline (tracking `0`) and a KPI number (tracking `-0.01em`)
can both use the same font-size without fighting each other.

## Spacing

No custom spacing scale — Tailwind's default 4px-based scale already lands
on every value `spacing.md` specifies (4, 8, 12, 16, 20, 24, 28, 32, 44,
48...), so `p-4`, `gap-6`, `px-5` etc. are used directly. The one exception
is `w-sidebar` (`--spacing-sidebar: 264px`), a named token because the
sidebar width is a real, repeated structural constant (also mirrored in
[`src/lib/layout.ts`](src/lib/layout.ts) for non-CSS reference). Don't
invent more named spacing tokens unless a value is reused the same way.

## Responsive breakpoints (Phase 11)

`--breakpoint-sm/md/lg/xl` in `globals.css` override Tailwind's stock
values (640/768/1024/1280) with responsive.md §31's own inferred table
(600/900/1200/1440), so `sm:`/`md:`/`lg:`/`xl:` map to spec-accurate
widths everywhere in the app — the same "familiar utility name, spec-
correct value" pattern already used for the radius scale. `lg` (1200px)
is defined but not yet consumed by a distinct behavior; responsive.md's
own `lg`-tier ("right column narrows proportionally, min 320px, before
columns stack") was deliberately simplified away — see "Decisions" below.

**Scope of this phase**: everything below is the CSS-only, low-risk
subset of responsive.md that's genuinely spec-directed. **Explicitly
out of scope**, per responsive.md's own disclaimers ("assumptions, not
observed fact," "needs product input before build," "implementation
choice"): sidebar collapse to an icon-rail/drawer, header search
collapsing to an icon, welcome-banner illustration hiding, and any
empty/loading/error states. None of these were built — inventing an
unconfirmed interaction pattern for any of them would violate this
phase's own "don't invent functionality outside scope" instruction.
Consequence: below roughly 700–800px, the fixed 264px sidebar
increasingly dominates the viewport and content legibility degrades
(measured, not hidden — see Phase 11's completion report).

What was built:

- **Two-column → single column** below `xl` (1440px): the row
  containing `w-col-left`/`w-col-right` becomes `flex-col`, and both
  columns switch from their fixed pixel widths to `w-full`
  (`dashboard/page.tsx`). Reading order when stacked is
  left-column-content-then-right-column-content, not
  responsive.md's suggested fully-interleaved order (Banner → Calendar
  → Stats → Upcoming → Schedule → New Meeting → Meeting Types) — that
  would require every section to be a flex sibling in one shared
  context with per-breakpoint `order-*` values, i.e. restructuring the
  validated two-column DOM, which this phase was told not to do without
  concrete evidence. Documented simplification, not a silent one.
- **Content density**: `MainContentShell` padding steps from `p-8`
  (32px, `md`+) to `p-5` (20px, below `md`) and the dashboard's three
  `gap-6` rhythms step from 24px to `gap-4` (16px) below `md` — per
  responsive.md's explicit "padding 32px → 20px, gaps 24px → 16px below
  md."
- **Card grids**: `DashboardStats` and `MeetingTypes` both go
  `grid-cols-1` → `sm:grid-cols-2` → `xl:grid-cols-4`, gap held at 16px
  throughout (spec: "gap held at 16px throughout").
- **List content-hiding** (`MeetingRow`): avatar stack and provider icon
  hidden below `md`. Originally implemented at `sm` (600px, matching the
  "sm" tier where responsive.md's own table starts describing narrow-
  width behavior) — **moved to `md` after measurement showed the `sm`
  choice was wrong**: Playwright measurement of the row's real
  `scrollWidth` found the row only clears the available space from
  ~700px up even with both hidden, so gating the hide at exactly 600px
  left a 600–699px window where the title (the spec's own stated
  floor — "title/time/Join are the minimum viable row") collapsed to
  0px width and disappeared entirely, worse than not hiding anything.
  Re-verified after the fix: title stays visible (25px+ width) across
  599–899px, confirmed with `md` as the new threshold.
- **`ScheduleItem`**: title/subtitle truncate (single line) from `md`
  up, wrap below `md` — per responsive.md's "event card content wraps
  rather than truncates where possible."

## Radius scale

## Radius scale

Exact values from `components.md`, overriding Tailwind's defaults so the
familiar utility names carry spec-correct pixel values:

| Utility        | Value | Used by                                         |
| -------------- | ----- | ----------------------------------------------- |
| `rounded-xs`   | 8px   | small buttons (Join, Upgrade Now), badges       |
| `rounded-sm`   | 10px  | search input, nav items, icon buttons           |
| `rounded-md`   | 12px  | primary CTA (New Meeting), event cards          |
| `rounded-lg`   | 16px  | stat cards, list containers, meeting-type cards |
| `rounded-xl`   | 20px  | welcome banner, calendar widget, Upgrade card   |
| `rounded-2xl`  | 24px  | app shell                                       |
| `rounded-full` | —     | avatars, dots, badges                           |

## Shadows

Two tokens only, both intentionally subtle — `colors.md` is explicit that
the reference has no dramatic elevation:

- `shadow-card` — `0 1px 2px rgba(20,30,20,.04), 0 4px 12px rgba(20,30,20,.03)` — every white surface (Card).
- `shadow-shell` — `0 20px 60px rgba(0,0,0,.25)` — the outer app shell only.

## Primitives (`src/components/ui`)

| Component    | Notes                                                                                                                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`     | `variant`: `primary` \| `secondary` \| `ghost` \| `subtle`. `size`: `sm`(32px/Join) \| `md`(36px/Upgrade Now) \| `lg`(48px/New Meeting). Always renders `text-button` typography; icon slots via `leadingIcon`/`trailingIcon`.                                  |
| `IconButton` | Requires `aria-label`. `size`: `xs`(20px, meeting-type card kebab, Phase 7) \| `sm`(24px) \| `md`(32px) \| `lg`(40px). `shape`: `circle` \| `square`, defaulted per size to match the reference (kebab/chevron = circle, header bell = square) and overridable. |
| `Card`       | `padding`: `none`\|`sm`(16)\|`md`(20)\|`lg`(24)\|`xl`(32). `radius`: `lg`(16, default) \| `xl`(20, calendar/banner-scale surfaces).                                                                                                                             |
| `Avatar`     | `size`: `sm`(24) \| `md`(32) \| `lg`(40). Image or `initials` fallback; `alt` is required; optional `status` dot (`online`/`offline`).                                                                                                                          |
| `Badge`      | `variant`: `neutral` \| `success` \| `warning` \| `brand` \| `orange` (solid — matches the header notification-count badge). Fixed 16px circular footprint by default, grows for multi-character content.                                                       |
| `Input`      | `label` (+ `hideLabel`), `leadingIcon`, `trailingSlot`, `error` (sets `aria-invalid`/`aria-describedby` and renders a message). 44px height / `rounded-sm`, matching the header search input exactly.                                                           |

All six share one composition pattern: a typed `*Props` interface, a
`className` escape hatch merged last via `cn()` (in
[`src/lib/utils.ts`](src/lib/utils.ts)), token-only Tailwind classes (no
arbitrary `bg-[#...]` values), and `focus-visible:` rings using
`ring-brand-800` — never a browser-default outline removed without
replacement.

## Application shell & sidebar (`src/components/layout`, `src/components/branding`)

| Component                                     | Notes                                                                                                                                                                                                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AppShell`                                    | Outer canvas + rounded/shadowed shell. Unchanged from Phase 1.                                                                                                                                                                                                      |
| `SidebarShell`                                | Structural only (width, light surface, padding, right border) — no assumed internal gap; `Sidebar` composes the actual rhythm. Background corrected to light in the final visual pass — see below.                                                                  |
| `Sidebar`                                     | Composes `SidebarLogo` → `SidebarNavigation` (32px gap) → a `mt-auto`-pushed group of `SidebarUpgrade` + `SidebarAccount` (16px gap).                                                                                                                               |
| `MeetPlanLogo` / `MeetPlanMark` (`branding/`) | Reusable brand lockup; the icon is a hand-drawn deterministic SVG (calendar + check), not a Lucide import, so it stays a dedicated brand asset. Icon square keeps its dark-green fill/white glyph; wordmark is dark ink (was white).                                |
| `SidebarLogo`                                 | Wraps `MeetPlanLogo` in a `Link` to `/dashboard`, light-surface focus styling (was light-on-dark).                                                                                                                                                                  |
| `SidebarNavigation` / `SidebarNavItem`        | Client component (`usePathname()`) driving `NAV_ITEMS` from [`src/lib/navigation.ts`](src/lib/navigation.ts) — no hardcoded `active` flags. Unimplemented routes get `prefetch={false}` so Next.js doesn't 404 an eager prefetch for a page that doesn't exist yet. |
| `SidebarUpgrade`                              | Bespoke (mirrors `Card`'s color recipe by hand rather than importing it — see below) + reuses `Button` with `variant="primary"` (was `subtle`), no focus-ring override needed anymore.                                                                              |
| `SidebarAccount`                              | A single `<button>` for the whole row (avatar + name/plan + chevron), not a div with a nested icon-button — avoids nesting interactive elements. No menu wired up yet.                                                                                              |
| `UpgradeIllustration` (`illustrations/`)      | Small schematic potted-plant + calendar SVG, all colors via CSS custom properties — unchanged; its brand-green/sage/white palette already read correctly on both the old dark card and the new light one.                                                           |

### Sidebar color scheme correction (final visual pass)

The first real reference image provided in this project (previously only
`visual-spec/*.md` text descriptions existed) revealed the sidebar is a
**light surface visually continuous with the main content**, not the
dark forest-green panel `colors.md`'s own `bg-sidebar: #0E2A1D` entry
described and every phase through 11 had built and validated against.
This was a whole-panel correction, audited element-by-element rather
than a blanket find/replace:

| Element                    | Before                                               | After                                                                                                                          |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Sidebar background         | `bg-sidebar` (`#0E2A1D`)                             | `bg-app` (`#F8F5EF`, same token as main content) + `border-r border-border` for a seam now that both panels share a background |
| Logo icon square           | `bg-brand-800`/white glyph                           | unchanged (reference shows the same treatment)                                                                                 |
| Logo wordmark              | `text-surface` (white)                               | `text-ink`                                                                                                                     |
| Inactive nav text/icon     | `text-sidebar-ink-muted`                             | `text-ink-muted` (same muted token body text uses elsewhere)                                                                   |
| Inactive nav hover         | `bg-sidebar-active/60`, white text                   | `bg-surface`, `text-ink`                                                                                                       |
| Active nav pill            | `bg-sidebar-active` (`#1D3E2C`)                      | `bg-brand-800` (`#163C2C`) — the same brand green as every other primary action, not a sidebar-specific shade                  |
| Upgrade card background    | `bg-sidebar-active`                                  | `bg-surface` + `border-border` + `shadow-card` (matches `Card`'s exact recipe)                                                 |
| Upgrade card title/subtext | `text-surface` / `text-sidebar-ink-muted`            | `text-ink` / `text-ink-muted`                                                                                                  |
| Upgrade Now button         | `variant="subtle"` + `ring-offset-sidebar!` override | `variant="primary"` (solid brand-green, white text — matches New Meeting CTA), no override needed                              |
| Account name/plan/chevron  | `text-surface` / `text-sidebar-ink-muted` ×2         | `text-ink` / `text-ink-muted` ×2                                                                                               |
| Account divider            | `border-white/10`                                    | `border-border`                                                                                                                |
| Account hover              | `bg-white/5`                                         | `bg-surface`                                                                                                                   |
| All sidebar focus rings    | `ring-surface`/`ring-offset-sidebar` (light-on-dark) | `ring-brand-800`/`ring-offset-app` (the same convention every other light-surface control in the app uses)                     |
| `Avatar` (account row)     | unchanged                                            | unchanged — its `brand-100`/`brand-800` fallback already read correctly on light surfaces (it's also used in the header)       |

**Tokens removed** (fully unused after this correction, confirmed by
grep before deletion): `--color-sidebar`, `--color-sidebar-active`,
`--color-sidebar-ink-muted`. `--color-brand-900` already carries the
same hex `--color-sidebar` did (`#0E2A1D`), so no color value was lost,
only the redundant/now-dead alias tokens.

**Not changed**: `--color-brand-800` itself (still the one CTA/active-state
green, unchanged value), `AppShell`'s outer dark canvas, sidebar width
(264px), `UpgradeIllustration`'s SVG (already token-driven, reads
correctly on either surface), the `Avatar` primitive, and all geometry/
spacing/typography — re-verified byte-identical via
`getBoundingClientRect()` after the fix.

## Dashboard content (`src/components/dashboard`)

| Component                                | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DashboardHeader`                        | Search (left) + notification bell and avatar (right), `justify-between`, full content width. Page-scoped (rendered from `dashboard/page.tsx`), not yet promoted to the shared `(app)/layout.tsx` — see Phase 4's completion report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `DashboardSearch`                        | Built on `Input` — `leadingIcon` (Lucide `Search`) + a `trailingSlot` "⌘K" `<kbd>` chip. No search behavior wired up.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `NotificationButton`                     | Built on `IconButton` (`size="lg"`, `variant="solid"`) + `Badge` (`variant="orange"`), absolutely positioned at `-top-1 -right-1` to overlay the button's corner.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `WelcomeBanner`                          | Bespoke gradient surface (`from-banner-from to-banner-to`, `bg-linear-to-br`) — not built on `Card`, which has no gradient/borderless mode. Headline uses `text-display`, **not** `text-kpi` — same 28px/700 size, but tracking `0` instead of `-0.01em`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `WelcomeIllustration` (`illustrations/`) | Deterministic flat-SVG skyline (buildings, trees, birds, clouds), all colors via CSS custom properties.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `DashboardStats`                         | `grid grid-cols-4 gap-4` inside the `w-col-left` column — card width (182px) is derived from the grid, not hardcoded.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `StatCard`                               | Built directly on `Card`'s defaults (`padding="md"` = 20px, `radius="lg"` = 16px — both already matched the spec with zero extension). Data-driven from `STAT_CARDS` (`src/lib/stats.ts`); accent → token mapping lives in `stat-card.tsx`, not in the data module.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `UpcomingMeetings`                       | A single `Card` (`role="region"` + `aria-labelledby`, no extra wrapper `<section>`) holding both the "Upcoming Meetings" / "View all" header row and the 4 `MeetingRow`s — components.md describes one bordered 776px container with the header row nested inside it, unlike the header-above-separate-cards pattern used by "Your Meeting Types" (later phase). Data-driven from `mockUpcomingMeetings` (`src/data/mock-meetings.ts`), typed against the pre-existing `Meeting`/`Contact` Zod schemas from `src/types/` (Phase 1) rather than a new parallel shape.                                                                                                                                                                    |
| `MeetingRow`                             | One row's worth of the layout in components.md → Upcoming Meetings: time block → provider icon → title/subtitle → avatar stack (via `Avatar`, `size="sm"`) → "Join" (`Button`, `size="sm"` `variant="subtle"`, width pinned to `w-18`/72px) → kebab (`IconButton`, `size="sm"` `variant="ghost"`). The five inter-element gaps (12/12/16/16/8px) are not uniform, so each is written as an explicit margin on the receiving element rather than one blanket flex `gap`. Time/day text (`formatMeetingTime`/`formatMeetingDay`, `src/lib/meeting-time.ts`) is derived from `Meeting.startsAt` (a real ISO datetime), not stored as a literal display string, so a real API's timestamps would render correctly with no component change. |
| `MeetingTypes`                           | Header row ("Your Meeting Types" + "Manage all") sits _above_ a `grid-cols-4 gap-4` of separate `MeetingTypeCard`s — the opposite structure from `UpcomingMeetings`, whose header is nested inside one wrapping `Card`. Same grid pattern as `DashboardStats`. Data-driven from `MEETING_TYPE_CARDS` (`src/data/mock-meeting-types.ts`).                                                                                                                                                                                                                                                                                                                                                                                                |
| `MeetingTypeCard`                        | Built on `Card` (`padding="sm"` = 16px, `radius="lg"` = 16px — zero extension). Icon badge (`IconButton`-free `<span>`, matching `StatCard`'s pattern) + a new `IconButton` `size="xs"` (20px) kebab, top row; title (`line-clamp-2`); meta; a bespoke (not `Button`-based) "Copy link" control — see decisions below for why.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MiniCalendar`                           | First right-column block. Built on `Card` (`padding="lg"` = 24px, `radius="xl"` = 20px — zero extension; `radius-xl` was reserved for "calendar widget" specifically since Phase 2's radius table). The only `"use client"` dashboard component so far — month prev/next is real local `useState`, deterministic (pure function of click count, never the real current date). Grid generation (`getCalendarMonth`/`shiftMonth`, `src/lib/calendar.ts`) and the initial state (`src/data/mock-calendar.ts`, pinned to the reference's own "May 2025" with the 20th selected) are separated from the presentational `CalendarDayCell`.                                                                                                    |
| `TodaysSchedule`                         | Second right-column block. A single `Card` (`padding="md"` = 20px, `radius="lg"` = 16px — zero extension) holding the header row and a 4-row timeline — same "single Card, header nested inside" structure as `UpcomingMeetings`, not `MeetingTypes`' header-above-cards structure. Reuses `mockUpcomingMeetings` (Phase 6) directly, not a second mock list — qa-checklist.md requires this section show "the same 4 events as Upcoming Meetings, mirrored correctly," confirmed identical (title-for-title) by Playwright measurement.                                                                                                                                                                                                |
| `ScheduleItem`                           | One timeline row: time label (`w-14`/56px, right-aligned) → 8px dot → event card (`rounded-md`/12px, `p-3`/12px, `bg-surface`) containing a 24×24 provider icon, title/subtitle, and a 20×20 kebab (`IconButton` `size="xs"`, reused from `MeetingTypeCard`, Phase 7). The continuous vertical connector line is drawn once by `TodaysSchedule` (not per-row) — see decisions below.                                                                                                                                                                                                                                                                                                                                                    |
| `NewMeetingCta`                          | Third/last right-column block. Built entirely on `Button` (`variant="primary"` `size="lg"`, `leadingIcon`, `className="w-full"`) — zero new styling. `size="lg"` (48px/`rounded-md`) has named "New Meeting" in its own doc comment since Phase 3; this is the first phase to actually use it for that button. No click behavior wired up, consistent with every other placeholder action so far.                                                                                                                                                                                                                                                                                                                                       |

## Accessibility

- Every interactive primitive has a real `:focus-visible` ring (2px,
  `brand-800`, 2px offset) — never `outline-none` without one.
- `IconButton` requires `aria-label` at the type level.
- `Avatar` requires `alt` at the type level.
- `Input` associates its `<label>` via `htmlFor`/`id` (auto-generated with
  `useId` if not supplied) and wires `error` to `aria-invalid` +
  `aria-describedby` + a `role="alert"` message.
- `disabled` uses the native attribute (not just a style), so it's
  announced and keyboard-inert for free.
- Global `prefers-reduced-motion` handling in `globals.css` shortens all
  CSS transitions/animations app-wide.

## Motion foundation

[`src/lib/motion.ts`](src/lib/motion.ts) defines shared, restrained Framer
Motion vocabulary (durations, an ease-out curve, `fadeIn`/`fadeInUp`
variants) for future feature components to opt into — no primitive here
uses Framer Motion itself. Hover/focus feedback on primitives is plain CSS
`transition-colors`, already inert under reduced motion via the global
media query. Anything future built on `lib/motion.ts` that animates more
than opacity should also check `useReducedMotion` (re-exported there).

## Decisions outside the spec

- **`--color-danger`** — the reference screenshot has no error/validation
  UI to sample, but `Input` is required to support an error state. Added
  one minimal danger token in the same warm/muted register as the rest of
  the palette. Flag for design review if a real error state ever appears
  in a future reference.
- **Upgrade Now button geometry** — `components.md` (184×36, radius 8) and
  `layout.md` §13 (216×40, radius 10) disagree. **Corrected in Phase 3**
  (this entry originally picked `layout.md`'s numbers; that was wrong).
  `components.md` states the Upgrade card itself is 216px wide with 16px
  padding on all sides; 216 − 16×2 = 184px, exactly `components.md`'s
  button width. `layout.md`'s 216px reads as having conflated the _card's_
  width (216, flush with the sidebar) with the _button's_ width (184,
  inset by the card's own padding) — an easy mistake since both nest in
  the same 216px column. `components.md`'s 36px/radius-8 was kept for the
  same reason: it's a direct estimate, not back-derived from a formula.
  `Button`'s `md` size is now 36px/`rounded-xs`, matching. UNVERIFIED
  against raw pixels — no image file exists in-repo to re-check, this is
  the best resolution available from the written specs alone.
- **Button label size** — `typography.md`'s canonical table states all
  button labels (explicitly naming "Join") are 14px/600; an earlier
  `components.md` note said 13px for Join specifically. `typography.md`
  was treated as authoritative for text styling, so `Button` renders
  `text-button` (14px) at every size.
- **Nav item count: 11, not "×10"** — `components.md`'s Sidebar → Nav item
  heading says "×10" but then enumerates 11 labels (Dashboard, Meetings,
  Calendar, Availability, Meeting Types, Contacts, Analytics,
  Integrations, Team, Billing, Settings). The enumerated list was trusted
  over the count in the heading (an off-by-one in the Phase 0 spec
  itself); all 11 are implemented.
- **Nav icon glyphs are inferred, not sampled** — `components.md` specifies
  each nav icon's slot (20×20px) but never which Lucide glyph it is, and
  no image file exists in-repo to sample pixels from. Each icon below is a
  semantic best-fit, not a verified match: Dashboard→`LayoutDashboard`,
  Meetings→`Video`, Calendar→`CalendarDays`, Availability→`Clock`, Meeting
  Types→`LayoutList`, Contacts→`Contact`, Analytics→`BarChart3`,
  Integrations→`Puzzle`, Team→`Users`, Billing→`CreditCard`,
  Settings→`Settings`. UNVERIFIED against the reference at pixel level —
  flag for design review.
- **`--color-sidebar-ink-muted` (`#9FB3A6`)** — components.md's own value
  for inactive nav text/icon, carried over verbatim as a new token since
  `text-ink-muted` is calibrated for the light `bg-app` surface and reads
  poorly on the dark sidebar.
- **Upgrade card background reuses `bg-sidebar-active`** rather than
  adding components.md's separately-estimated "~#12301F" — both are
  approximations from the same single screenshot, and reusing the
  already-defined "elevated surface on dark" token avoids a near-duplicate
  color for one card.
- **Upgrade illustration is schematic**, not a pixel match — Phase 3's own
  match-list for the Upgrade card doesn't require matching the artwork,
  and there's no image file in-repo to sample it from. It's a best-effort
  reproduction of "potted plant + calendar icon."
- **Stat-card icon badge colors: "peach" vs "orange" resolved in favor of
  visual variety.** `colors.md`'s accent table assigns `orange-400` to
  _both_ the "Pending Invitations" and "Revenue" badges, but
  `components.md`'s stat-card section describes them with two different
  words ("peach badge" vs "orange badge"). Resolved toward
  `components.md`'s distinction: Pending Invitations uses the lighter
  `accent-orange-100` tint, Revenue uses the stronger `accent-orange` —
  matching a direct recollection of the reference having four visually
  distinct badge colors, not two identical oranges. UNVERIFIED at pixel
  level; flag for design review.
- **Stat-card icon glyphs**: `Calendar`, `Users`, `Clock` are inferred
  semantic best-fits, still unverified against pixels — `components.md`
  names the concept, not the Lucide glyph. The Revenue glyph was
  originally `IndianRupee` (inferred from the printed value's "₹"
  symbol) — **corrected to `DollarSign` against the reference image**
  (final visual pass): the reference's actual badge icon is a generic
  dollar sign even though the printed value stays in rupees
  (`₹24,680`, untouched). Icon glyph and printed currency are
  independent in the reference itself, not a bug to reconcile.
- **Stat-card height: `~140px` (spec) vs. `~178.6px` (measured, using the
  spec's own other values).** `layout.md`/`components.md` both mark the
  card height as approximate ("~140px"), but the _precise_, non-tilde
  values in the same files — 20px padding, a 40px icon badge, 16px/4px/8px
  gaps, and 13px/28px/12px line-heights — sum to ≈178.6px, not 140px.
  Enforcing a literal 140px would require silently compressing one of
  those more-precisely-stated values (which would itself create a new,
  undocumented deviation) or clipping content. Resolved by treating 140px
  as a `min-h-35` floor rather than a fixed height, so the card renders at
  its natural ≈178.6px — no gaps, padding, or type sizes were compressed
  to hit the approximate target. Documented rather than silently
  overridden, per this phase's own instruction not to fabricate precision.
- **Down-trend styling (`text-danger`) is unevidenced** — every stat card
  in the reference trends upward; a "down" trend variant was still built
  defensively (real data will eventually vary) using the existing danger
  token rather than a new color. No reference evidence either way.
- **Upcoming Meetings row content — subtitles and 2 of 4 times corrected
  against the reference image (final visual pass).** `qa-checklist.md`
  gives the 4 exact meeting titles ("Design Review", "Product Demo",
  "Interview – UX Designer", "Sales Call"; used verbatim, including the
  en dash), but no spec file ever gave subtitle/time values — the
  original content (documented here as "invented, not sampled") is now
  confirmed against the actual reference: subtitles are "Team Sync" /
  "Acme Corporation" / "Hiring Team" / "Global Solutions" (previously
  "Product Team Sync" / "with Acme Corporation" / "with Jordan Lee" /
  "with Globex Industries"), and times are 09:30 AM / 11:00 AM /
  **02:30 PM** / **04:00 PM** (previously 02:00 PM / 04:30 PM for the
  last two). Mock attendees (fictitious names, `@example.com` emails, no
  real personal data) are still invented — no reference evidence exists
  for who attends each meeting, only the row-level text.
- **Reused the Phase 1 `Meeting`/`Contact` Zod types** (`src/types/`)
  instead of a new parallel shape for mock meeting data — the phase brief
  suggested a fresh `UpcomingMeeting` type, but one already existed
  ("architecture" already established Phase 1) with the right fields
  (`title`, `subtitle?`, `startsAt`/`endsAt`, `provider`, `status`,
  `attendees: Contact[]`), so it was reused rather than duplicated.
- **Provider icons are a generic glyph, not literal Google
  Meet/Zoom/Teams logos.** components.md's own wording ("Google Meet /
  Zoom / Teams brand glyph") is ambiguous between "a glyph representing
  that brand" and "that brand's actual logo mark" — resolved toward the
  former: all three providers render the same Lucide `Video` icon, tinted
  with the accent color `colors.md` already assigns to that platform
  (`accent-blue` for the Zoom-coded meeting, `accent-purple` for Teams,
  `brand-600` for Google Meet). Avoids reproducing trademarked marks and
  matches this phase's explicit preference for deterministic local
  placeholders over anything resembling a real brand asset. A
  screen-reader-only label (`sr-only`) still names the actual platform
  per row.
- **Row title / row time typography compose raw size tokens + Tailwind's
  built-in weight utilities** (`text-base font-semibold` for the 14/600
  row title, `text-sm font-medium` for the 13/500 time, bare `text-xs`
  for the 12/400 "Today" label) instead of either (a) a new `@utility`
  for a role used only once so far, or (b) layering a semantic utility
  (e.g. `text-body`) under a weight override — semantic utilities already
  set `font-weight` themselves, so a later Tailwind weight class would be
  racing the same CSS property with no source-order guarantee (the same
  specificity problem documented above for `SidebarUpgrade`'s focus
  ring). Raw size tokens only set `font-size`/`line-height`, so composing
  them with `font-semibold`/`font-medium` has no property collision.
  `typography.md` states 1.3 line-height for the time/day text where the
  paired raw tokens (`text-sm`/`text-xs`) give 1.4 — a ~1px difference on
  12–13px text that the spec itself calls a "best-fit approximation" with
  no source image to re-check; not worth a third near-duplicate token pair
  for a sub-pixel gap. Flag for design review if a reference image ever
  surfaces.
- **Upcoming Meetings container height: `~300–330px` (spec) vs. `~372px`
  (measured).** Same category of conflict as the Phase 5 stat-card height
  — the container's own precise parts (20px padding, 28px header + 16px
  margin, 4 rows whose own precise sub-values total ≈73px each with a 1px
  divider) sum higher than the file's separate approximate total.
  Resolved the same way: no fixed height, no compressed padding/type —
  the container grows to fit its real content.
- **Avatar-stack overlap can visually clip an initials pair's second
  letter** — spacing.md's own `−8px` overlap value means the later
  (frontmost, painted-on-top) avatar in a pair necessarily covers part of
  the earlier one; with two-letter initials this can leave only a
  fragment of the second letter visible (e.g. "L" reads as a bare
  vertical stroke). This is a direct, expected consequence of the
  specified geometry — every stacked-avatar UI with initials fallbacks
  and this much overlap has the same trait — not a rendering bug, and not
  "fixed" by reducing the overlap, which would itself deviate from the
  spec's explicit value.
- **`getInitials` added to `src/lib/utils.ts`** — a small, generic
  two-letter-initials helper (first + last name; first two letters for a
  single-word name), reused by every `MeetingRow` avatar rather than
  duplicating the single-letter inline logic the header/sidebar account
  rows already use (`name.charAt(0)`, kept as-is — a one-word "Account"
  name doesn't need the two-letter helper).
- **Meeting-type card kebab count: one, not two.** components.md's own
  "Your Meeting Types" section lists a 20×20 top-right kebab _and_,
  separately, a 16×16 kebab in the footer/copy-link row description — but
  flags itself: "reference shows one kebab per card, verify single vs.
  double on build." Resolved toward **one** kebab, top-right, 20×20 — the
  footer-row mention reads as the same icon being re-described while
  itemizing that row's contents, not a second independent control (a card
  with two separate "more options" triggers would be an unusual, unlikely
  UI pattern). The footer row itself only has the link icon + "Copy link"
  label.
- **Meeting-type kebab size: 20×20, not the generic 24×24.** The general
  icon-size table (components.md's summary) gives kebab buttons as
  24×24, and `IconButton`'s `sm` size (24px) already serves that generic
  case (Upcoming Meetings' row kebab, Phase 6). But _this_ component's
  own section states 20×20 twice (layout.md §12 and components.md's
  meeting-type entry) — the more specific, component-level value was
  preferred per this phase's own conflict-resolution rule, via a new
  `IconButton` `size="xs"` (20px) rather than fighting `sm`'s styles with
  an arbitrary override.
- **Meeting-type card title reuses the 14/600/1.4 composition from
  Phase 6's list-row title**, not typography.md's stated 1.3 line-height
  for "Meeting-type card title." Both roles fall under the same
  hierarchy tier in typography.md's own list ("5. Card/row titles"), and
  a visibly different line-height between two near-identical title
  styles would read as an inconsistency introduced by spec-sampling
  noise, not an intentional design distinction — same reasoning already
  applied to Phase 6's row-time/day-label line-heights. The ~1.4px gap
  (14×1.3=18.2px vs 14×1.4=19.6px) is UNVERIFIED against any source
  image. Same treatment applied to "Copy link" (spec: 12/500/1.3; reuses
  `text-caption`, 12/500/1.4).
- **Meeting-type icon badge tints for `blue`/`pink` are derived, not
  new tokens.** Only `peach` (`accent-orange-100`) has a dedicated pale
  variant already. `blue` uses `bg-accent-blue/15` — the existing
  `accent-blue` token at 15% alpha via Tailwind's built-in color-opacity
  modifier, not a new hex value. `pink` uses `accent-pink` as-is for the
  background (it's already pale — colors.md samples it from the banner
  illustration) with `text-ink` for the glyph, since no darker pink token
  exists to pair as an icon color. No new `@theme` entries were added.
- **Card 1 ("30 Min Consultation") accent corrected from `peach` to a
  new `neutral` value (final visual pass).** components.md's text
  description ("video icon peach, video icon peach...") read as both
  Consultation and Strategy Call sharing one peach tint — the reference
  image shows card 1 as a neutral/cream badge, distinct from card 2's
  peach. Added `neutral` to `MeetingTypeAccent`, styled identically to
  `StatCard`'s existing `neutral` accent (`bg-app`/`text-ink`) rather
  than inventing a new treatment for the same concept.
- **Meeting-type card height: `~104–110px` (spec) vs. `~155.2px`
  (measured).** Same category of conflict as the Phase 5 stat cards and
  Phase 6 Upcoming Meetings container: the card's own precise parts
  (16px padding ×2, a 40px icon-badge row, 12/4/12px gaps, and the real
  line-heights of a title + meta + copy-link row) sum well past the
  file's separate approximate total. Resolved the same way — `min-h-27`
  (108px) as a floor, not a fixed height; no padding, gaps, or type sizes
  were compressed to force the approximate number.
- **Quick Demo / Interview Session duration and format corrected against
  the reference image (final visual pass).** Only "30 Min Consultation"
  and "60 Min Strategy Call" encode their duration in the title itself;
  qa-checklist.md never gave the other two, so both were originally
  invented (15 min/One-on-One and 45 min/Group). The reference confirms
  Quick Demo is **30 mins • Group** and Interview Session is **45 mins •
  One-on-One** — both fields wrong on Quick Demo, only the format wrong
  on Interview Session (its 45 min duration was already correct).
- **"Copy link" is a bespoke `<button>`, not built on `Button`.** The
  reference shows a plain inline icon+text control with no visible
  button chrome (background/border/fixed height) — `Button`'s smallest
  size (32px, padded) would visually misrepresent it. No clipboard
  behavior is wired up, consistent with every other placeholder control
  in the app so far (Join, kebabs, search, "View all"/"Manage all").
- **Calendar cell height: 36px, resolving a direct layout.md-vs-
  components.md conflict.** layout.md §9 states date-grid cells as
  "~48×40px"; components.md's own "Mini calendar widget" section states
  "~48×36px" for the same cells. Resolved toward components.md's 36px:
  summing the widget's own precise parts (24px padding ×2, 32px header,
  16px header→weekday gap, 24px weekday row, 8px weekday→grid gap, 16px
  grid→footer gap, 20px footer) against each candidate cell height gives
  164 + 6×36 = **380px** (36px) vs. 164 + 6×40 = 404px (40px) — only the
  36px value lands inside either file's own stated total (layout.md:
  "~370–380px"; components.md: "~375px"). The measured implementation
  (380.19px) confirms this: MATCH, not an approximation.
- **Reference state pinned to "May 2025", day 20 selected** —
  components.md and qa-checklist.md both give this explicitly, so it's
  reproduced exactly (`src/data/mock-calendar.ts`) rather than deriving
  from the real current date. All calendar-grid math runs in UTC
  (`src/lib/calendar.ts`), the same timezone-pinning already used for
  meeting times (Phase 6), so the grid is identical regardless of
  viewer timezone and deterministic for QA.
- **Event dates are invented, not sampled** — no visual-spec file
  enumerates which specific days show the event dot, only that some do.
  Six dates were chosen (`CALENDAR_EVENT_DATES`), including the 20th
  itself. UNVERIFIED as sampled content.
- **No dot renders under the selected date** — inferred, not directly
  evidenced. The 32px selected-circle plus a 2px gap plus a 4px dot
  (38px) would exceed the resolved 36px cell height; suppressing the dot
  for that one cell is the only way to fit both spec values (32px circle,
  36px cell) without compressing either. An invisible same-size spacer
  keeps every other cell's number vertically aligned regardless of
  whether it has a dot.
- **Month-label/date-number line-height uses the paired 1.4 raw-token
  value, not typography.md's stated 1.3** — the same category of minor
  (~1px) consolidation already applied to Phase 6/7 typography for the
  same reason (no dedicated 1.3-paired size token exists at 16px/13px,
  and the spec calls its own measurements best-fit approximations). The
  weekday-label row (`text-overline`) needed no such consolidation —
  its existing 1.3 line-height and `0.04em` tracking, built in since
  Phase 2, matched the spec exactly on first measurement.
- **Footer icon is a Lucide `CalendarDays` glyph, not the reference's
  literal "📅" emoji character.** components.md's spec text includes
  the emoji inline, but this phase's own instructions explicitly say
  "Do not use emojis" — taken as authoritative for this implementation
  over the spec text's literal character (unlike the Welcome banner's
  "👋" in Phase 4, where no such prohibition existed for that phase).
- **Month navigation is real and interactive** (`"use client"`,
  `useState`), the first genuinely-functional control in the dashboard
  content — every prior placeholder-style control (Join, kebabs, search,
  "View all"/"Manage all"/"Copy link") deliberately has no wired
  behavior. This phase's instructions explicitly called for real,
  accessible navigation buttons, so `MiniCalendar` is an intentional,
  scoped exception, not a precedent for wiring up the others.
- **`PROVIDER_STYLES` extracted from `meeting-row.tsx` into
  `src/lib/meeting-provider.ts`** (Phase 9) so `ScheduleItem` can reuse
  the exact provider→glyph/color mapping `MeetingRow` already used,
  rather than a second, independently-maintained copy — required by this
  phase's own "no duplicated JSX/config" standard and by qa-checklist's
  "mirrored correctly" requirement. Purely mechanical (one constant
  moved, one import line changed in `meeting-row.tsx`); confirmed
  zero visual change via Playwright (`MeetingRow`'s provider-icon
  bounding box measured identical before/after).
- **Today's Schedule timeline-connector line is a single element**,
  drawn once by `TodaysSchedule` across the whole 4-row list (`top-3
bottom-3 left-16`, all real Tailwind tokens), not per-row. A per-row
  line requires the rail column to stretch to the row's _padded_ height
  for adjacent segments to meet seamlessly, which flexbox's
  `align-items: stretch` doesn't do when the gap is implemented as
  padding on the row itself — a single absolutely-positioned line avoids
  that entirely. `top-3`/`bottom-3` (12px) are a reasonable approximation
  of "starts at the first dot, ends at the last dot," not a
  JS-measured exact fit — UNVERIFIED at the pixel level.
- **Connector-line color: `border-divider`, not evidenced.**
  components.md specifies the dot's fill ("8px dot, brand-green fill")
  but not the connecting line's color. `brand-800` felt too visually
  heavy for a thin structural line running behind 4 white event cards,
  so the same neutral hairline token already used for Upcoming
  Meetings' row dividers was reused instead. UNVERIFIED against the
  reference.
- **Today's Schedule container height: `~300–330px`/`~320px` (spec) vs.
  `~372.5px` (measured).** Same category of conflict as Upcoming
  Meetings, stat cards, and meeting-type cards (Phases 5–7): the
  container's own precise parts (20px padding ×2, 23.4px header, 16px
  margin, 4 rows whose own precise sub-values total ~64–76px each with a
  12px inter-row gap) sum higher than the file's separate approximate
  total. Resolved the same way — no fixed height, no compressed padding
  or type sizes.
- **Time-label text wraps to two lines ("09:30" / "AM")** inside the
  56px-wide rail column — a direct, unavoidable consequence of
  components.md's own narrower width for this section (vs. Upcoming
  Meetings' 64px time block, where the same string fits on one line).
  Not compressed or reformatted to force one line, since doing so would
  mean deviating from the spec's stated 56px column width instead.
  UNVERIFIED whether the reference itself wraps here or fits on one
  line — no source image to check.
- **"See full day" links to `/calendar`** (existing nav route,
  `prefetch={false}`), the same destination as the mini calendar's own
  "View full calendar" footer link — no dedicated "day view" route
  exists in `NAV_ITEMS`, and `/calendar` is the closest conceptual match.
  Low-stakes: the route isn't implemented yet regardless.
- **Right column's non-uniform gap (Phase 10)**: spacing.md gives 24px
  between the mini calendar and Today's Schedule (the same rhythm used
  everywhere else in the dashboard) but an explicitly different 16px
  between Today's Schedule and the New Meeting CTA — not a spec
  conflict, just two genuinely different stated values for two
  different pairs. `MiniCalendar`/`TodaysSchedule` weren't given a
  `className` prop to solve this from the outside-in (extending two
  Phase 6/8 components for a purely external spacing concern would be
  exactly the kind of "refactor unrelated components" this phase's
  instructions warn against); instead `dashboard/page.tsx` wraps
  `TodaysSchedule` in a `mt-6` div and `NewMeetingCta` in a `mt-4` div,
  replacing the right column's single blanket `gap-6` (which would have
  applied 24px everywhere, including the one pair that needs 16px).
  Measured: 24px and 16px respectively, both exact.
- **New Meeting CTA has no spec conflict** — layout.md §13 and
  components.md agree on every value (376×48, radius 12, `#163C2C`
  fill, white text, 16×16 "+" icon, 8px gap, centered), the first
  right-column element this project has built without needing to
  resolve competing numbers. All values matched `Button`'s existing
  `size="lg"`/`variant="primary"` exactly, with zero primitive
  extension required.

## Final QA sign-off (against `qa-checklist.md`)

Every visible/functional item in `qa-checklist.md` was implemented across
Phases 1–10 (component inventory) and the subsequent responsive pass. This
is the formal item-by-item reconciliation the checklist's own "Sign-off"
section asks for, run as one pass after all sections coexist on the page
(rather than trusting each phase's isolated report alone).

**Structure / Sidebar / Header / Welcome banner / Calendar widget / Stat
cards / Upcoming Meetings / Today's Schedule / New Meeting CTA / Your
Meeting Types** — every checkbox in these nine sections: **PASS**,
verified in its origin phase and re-confirmed unchanged in every
subsequent phase's regression check (Phases 4–11 each re-measured every
prior section's exact bounding box).

**Color & type fidelity:**

- Brand green, cream background, Inter font, heading weights: **PASS**
  (token-driven since Phase 1/2, never a stock Tailwind color — confirmed
  by grep, zero raw hex values in any `className`, only in code comments
  documenting the source hex).
- "No unintended color drift on hover/focus states": **PASS**, audited
  this phase — every `hover:`/`focus-visible:` class in the codebase
  (grepped in full) resolves to a named token (`brand-800`, `brand-900`,
  `surface-alt`, `ring-surface`/`ring-offset-sidebar` for the dark-surface
  variant), never an arbitrary value. 14 representative interactive
  elements spot-checked live via Playwright (`getComputedStyle().boxShadow`
  post-focus) — all show the expected token-derived ring.

**Spacing & alignment:**

- 776px/376px column widths: **PASS**, re-verified this phase alongside
  every other Phase 1–10 landmark.
- "No unintended text clipping, icon misalignment, or overflow at
  reference resolution": **PASS**, audited this phase with a full DOM
  scan at 1536×1024 for any element where `scrollWidth > clientWidth`.
  12 matches, all expected: `sr-only` visually-hidden labels (near-zero
  `clientWidth` by design), the notification badge's intentional
  `-top-1 -right-1` overlap, and the welcome banner's illustration
  (bleeds 8px past the section box exactly as spec'd, invisibly clipped
  by the section's own `overflow-hidden`). Zero `.truncate`/
  `line-clamp` elements were actually truncating any content at this
  resolution — every title/label comfortably fits. Zero zero-size SVGs.

**Sign-off:**

- "Side-by-side screenshot diff at 1536×1024 shows no structural
  discrepancies": **UNVERIFIED** — no reference screenshot file exists
  anywhere in this repository (confirmed by filesystem search; this was
  already true in every prior phase). Every phase's report instead
  documented measured values against the written `visual-spec/*.md`
  files, the only available source of truth, and flagged anything
  approximate or invented as such rather than claiming a diff that
  can't actually be run.
- "All values reconciled, deviations documented": **PASS** — every
  intentional deviation from a literal spec number is logged above with
  its reasoning (~40 entries across Phases 2–11), not silently applied.
