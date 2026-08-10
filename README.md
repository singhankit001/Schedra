# MeetPlan

A premium meeting-management dashboard built with a screenshot-driven design
system and a real, working functional layer on top of it — Next.js App
Router, TypeScript, Tailwind CSS v4, and Zustand.

## Overview

MeetPlan is a Calendly-style scheduling dashboard: a sidebar-navigated shell
around a "today at a glance" home screen (welcome banner, KPI stats, an
upcoming-meetings list, a mini calendar, today's timeline, meeting types,
and a New Meeting flow), plus full pages for meetings, calendar,
availability, meeting types, contacts, analytics, integrations, team,
billing, and settings.

The project was built in two deliberate stages:

1. **A visual implementation phase** — the UI was reconstructed
   phase-by-phase against a set of written visual specs
   (`visual-spec/*.md`) and, later, an actual reference screenshot,
   with every measurement (spacing, color, radius, typography) checked
   with Playwright rather than eyeballed. `DESIGN_SYSTEM.md` is the
   full record of that process, including every place a spec was
   ambiguous or approximate and how it was resolved.
2. **A functional layer** on top of the validated visual shell: a
   single Zustand store drives real state — creating a meeting updates
   the KPI stats and every list that shows it, in the same render pass,
   with no page reload; search, notifications, the account menu,
   meeting-type CRUD, and the interactive calendar are all wired to
   real handlers rather than static markup.

Nothing here talks to a real backend — there's no auth, no database, no
calendar-provider integration. Every interaction is real *client-side*
behavior (state, validation, clipboard, toasts) against deterministic
local mock data. See [Current Scope / Future Work](#current-scope--future-work)
for the exact line between what's implemented and what isn't.

## Features

- **Sidebar navigation** — 11 real routes (Dashboard, Meetings, Calendar,
  Availability, Meeting Types, Contacts, Analytics, Integrations, Team,
  Billing, Settings), active-state driven by the current pathname, no
  dead links.
- **Global search** (`⌘K` / `Ctrl+K`) — searches meetings and contacts
  live as you type, keyboard-navigable, opens the relevant details modal.
- **Notifications popover** — real unread state, "mark all as read."
- **Account menu** — dropdown with a working sign-out (shows a toast;
  see Future Work — there's no session to actually end).
- **Welcome banner** — reference-matched gradient banner with a
  hand-built, deterministic city-skyline SVG illustration (see
  `DESIGN_SYSTEM.md` for the element-by-element reconstruction notes).
- **KPI statistics** — Upcoming Meetings, Pending Invitations, Hours
  Booked, Revenue; the Upcoming Meetings count is genuinely live (it
  increments/decrements as meetings are created or canceled).
- **Upcoming Meetings** and **Today's Schedule** — both read from the
  same underlying store, so they never drift out of sync.
- **New Meeting** — a real modal with client-side validation (required
  fields, end-after-start), participant chips, notes, and a platform
  picker; on submit it creates a meeting that immediately appears in
  every list that shows it.
- **Join** — opens a real meeting-details modal (mock data, since there's
  no live video backend to actually join).
- **Kebab menus** — view details, copy the meeting link via the real
  Clipboard API, and cancel with a confirmation dialog.
- **Meeting Types** — full CRUD (create, rename, delete) plus "Copy
  link," all backed by the store.
- **Interactive calendar** — the mini calendar and the full `/calendar`
  page share one selected-date cursor in the store; month navigation and
  day selection are real, not static.
- **Real platform marks** — Google Meet, Zoom, and Microsoft Teams are
  rendered with their actual brand geometry/colors (sourced from the
  open-source Simple Icons catalog), not generic placeholders.
- **Responsive layout** — two-column dashboard collapses to one column
  below `xl`; padding, gaps, grids, and row content density step down
  through `md`/`sm` per `visual-spec/responsive.md`.
- **Accessibility** — semantic landmarks, labeled icon-only controls,
  visible focus rings everywhere, `aria-live`/`role="alert"` on
  validation errors, `prefers-reduced-motion` support.
- **Deterministic mock data** — every list is driven by typed data
  modules (`src/data/*`), never hardcoded JSX, so real data could be
  swapped in without touching a single component.

## Tech Stack

Directly from `package.json` — nothing here is aspirational:

| Layer | Library |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 5](https://www.typescriptlang.org) (strict mode) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (`@theme` tokens) |
| State | [Zustand 5](https://zustand.docs.pmnd.rs) |
| Data fetching plumbing | [TanStack Query 5](https://tanstack.com/query) (provider wired, no live queries yet — see Future Work) |
| Validation / schemas | [Zod 4](https://zod.dev) |
| Icons | [lucide-react](https://lucide.dev) |
| Motion | [Framer Motion](https://www.framer.com/motion/) (shared variants defined, opt-in) |
| Linting | [ESLint 9](https://eslint.org) (`eslint-config-next`, flat config) |
| Formatting | [Prettier 3](https://prettier.io) (+ `prettier-plugin-tailwindcss`) |
| Testing/QA | [Playwright](https://playwright.dev) (used for visual + functional QA scripts; no committed test suite yet) |

## Architecture

```
src/app/          Next.js App Router — route groups, layouts, pages
src/components/
  ui/             Dependency-free primitives: Button, Card, Dialog, Input,
                  Select, Avatar, Badge, IconButton, DropdownMenu, Toast
  layout/         App shell + sidebar (structural, not page-specific)
  dashboard/      Page-specific composed components (stat cards, meeting
                  rows, the calendar widget, modals, menus, ...)
  branding/       The MeetPlan logo/wordmark
  illustrations/  Deterministic local SVG illustrations
src/data/         Typed mock data modules (meetings, meeting types,
                  contacts, calendar events, notifications, account)
src/lib/          Pure functions: calendar math, meeting-time formatting,
                  stats derivation, layout constants, motion variants
src/stores/       Zustand store(s) — the single source of client state
src/types/        Zod schemas + inferred types shared across the app
```

Components are split by **reusability, not by feature**: `components/ui`
never imports from `components/dashboard`, and every dashboard component
composes `ui` primitives rather than reimplementing button/card/input
styling locally. Data-driven rendering (`STAT_CARDS`, `MEETING_TYPE_CARDS`,
`NAV_ITEMS`, ...) means adding or reordering content is a data-module edit,
not a JSX edit — the same pattern used throughout so real data can replace
mock data later without a component rewrite.

## Design System

Full detail lives in [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — this is a
summary, not a replacement for it.

- **Typography** — Inter, self-hosted via `next/font`. Two layers: raw
  size tokens (`text-2xs`…`text-2xl`) and semantic utilities
  (`text-display`, `text-kpi`, `text-heading`, `text-body`, `text-nav`,
  `text-button`, ...) that bundle size + weight + line-height +
  tracking for one named role each.
- **Colors** — one semantic token set in `globals.css`'s `@theme` block:
  a warm cream surface (`bg-app`), a single brand-green scale
  (`brand-100/600/800/900`) used consistently for every primary/active
  state, pastel accents reserved for icon badges and illustration fills
  only, never body text or large surfaces.
- **Spacing** — Tailwind's default 4px scale covers every spec value
  directly; the one named exception is `--spacing-sidebar` (264px), a
  real structural constant.
- **Radii** — a 7-step scale (`rounded-xs` 8px → `rounded-2xl` 24px)
  overriding Tailwind's defaults so familiar utility names carry
  spec-correct pixel values app-wide.
- **Borders / focus states** — every interactive primitive has a real
  `:focus-visible` ring (`ring-brand-800`, 2px, 2px offset); disabled
  states use the native `disabled` attribute, never a style-only fake.
- **Layout columns** — a fixed 264px sidebar, a 776px left content
  column, a 376px right content column at the reference viewport
  (1536×1024), collapsing to a single stacked column below `xl`.
- **Component primitives** — `Button`, `IconButton`, `Card`, `Avatar`,
  `Badge`, `Input`, `Select`, `Dialog`, `DropdownMenu`, `Toast` — six of
  them share one composition pattern (typed props, `cn()`-merged
  `className`, token-only Tailwind classes, no arbitrary `bg-[#...]`
  values).
- **Visual QA methodology** — every phase's measurements were taken
  with Playwright (`getBoundingClientRect()`, computed styles) against
  the written specs, not estimated; every approximation or invented
  value (mock data, unverified icon glyphs, etc.) is explicitly flagged
  as such in `DESIGN_SYSTEM.md` rather than silently presented as exact.

## Project Structure

```
calendly/
├── AGENTS.md
├── DESIGN_SYSTEM.md
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── tsconfig.json
├── visual-spec/
│   ├── colors.md
│   ├── components.md
│   ├── layout.md
│   ├── qa-checklist.md
│   ├── responsive.md
│   ├── spacing.md
│   └── typography.md
└── src/
    ├── app/
    │   ├── (app)/
    │   │   ├── analytics/page.tsx
    │   │   ├── availability/page.tsx
    │   │   ├── billing/page.tsx
    │   │   ├── calendar/page.tsx
    │   │   ├── contacts/page.tsx
    │   │   ├── dashboard/page.tsx
    │   │   ├── integrations/page.tsx
    │   │   ├── layout.tsx
    │   │   ├── meeting-types/page.tsx
    │   │   ├── meetings/page.tsx
    │   │   ├── settings/page.tsx
    │   │   └── team/page.tsx
    │   ├── layout.tsx
    │   ├── page.tsx            (redirects "/" → "/dashboard")
    │   └── providers.tsx
    ├── components/
    │   ├── branding/meetplan-logo.tsx
    │   ├── dashboard/          (26 page-specific components)
    │   ├── illustrations/upgrade-illustration.tsx
    │   ├── layout/             (app shell + sidebar, 8 files)
    │   └── ui/                 (10 dependency-free primitives)
    ├── data/                   (8 typed mock data modules)
    ├── lib/                    (9 utility/domain modules)
    ├── stores/
    │   ├── app-store.ts        (meetings, meeting types, notifications,
    │   │                        toasts, modal, calendar cursor, search)
    │   └── ui-store.ts
    └── types/                  (Zod schemas + inferred types)
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to
`/dashboard`.

Production build:

```bash
npm run build
npm run start
```

## Validation

Every change in this project is checked with the same four commands
(all real `package.json` scripts):

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run format:check # prettier --check .
npm run build         # next build (also re-runs the TypeScript check)
```

All four are currently clean, and `next build` statically prerenders all
13 routes with zero errors.

Beyond the CLI checks, this project's actual test methodology has been
**Playwright-driven visual and functional QA**, run ad hoc against the dev
server rather than as a committed automated suite: bounding-box/spacing
measurements against the visual specs, screenshot comparisons against the
reference image, console-error/page-error/failed-request checks, and
interaction scripts (create a meeting, verify it appears everywhere it
should; copy a link, read the clipboard back; etc.). There is no
`npm run test` script — Playwright is a dev-time QA tool here, not a
committed CI suite.

## Visual QA

The UI was built **reference-driven**, not estimated:

1. Written specs (`visual-spec/*.md`) were the source of truth for the
   first eleven build phases — every spacing/color/radius/typography
   value was implemented against those numbers and re-measured with
   Playwright after each phase.
2. Once an actual reference screenshot became available, it superseded
   the text specs wherever they disagreed — this produced a documented
   correction pass (sidebar color scheme, meeting content, meeting-type
   metadata, the Revenue icon, and the welcome-banner illustration).
3. Every subsequent change was re-checked against the same four
   landmarks: DOM geometry (unchanged sections must measure
   byte-identical before/after), zero console/page errors, zero
   horizontal overflow, and a visual screenshot diff against the
   reference.

This project does **not** claim mathematical pixel-for-pixel identity to
the reference — there is no automated pixel-diff tool in the loop, only
Playwright measurements plus human visual comparison. Anywhere a value
couldn't be confirmed against the reference (an invented mock name, an
inferred icon glyph, an approximate stroke color), `DESIGN_SYSTEM.md`
says so explicitly rather than presenting it as verified.

## Accessibility

- Semantic HTML throughout (`<nav>`, `<section aria-labelledby>`,
  `<button>` for every interactive control — no clickable `<div>`s).
- Every icon-only control (`IconButton`) requires an `aria-label` at the
  type level; decorative icons are `aria-hidden`.
- Every `Avatar` requires `alt` at the type level.
- Real keyboard navigation: full tab order through the sidebar, header,
  and every dashboard control; `⌘K`/`Ctrl+K` opens search; `Escape`
  dismisses dialogs and popovers; dropdown menus close on outside click
  or `Escape`.
- Visible `:focus-visible` rings on every interactive element — never a
  removed browser-default outline with nothing in its place.
- Form validation wires `aria-invalid` + `aria-describedby` +
  `role="alert"` to the error message, and forms use `noValidate` so a
  custom error message — not just the browser's native tooltip — is
  what's announced.
- Global `prefers-reduced-motion` handling shortens all CSS
  transitions/animations app-wide.

## Engineering Decisions

- **Reusable primitives over one-off styling** — six `components/ui`
  components share one composition pattern; no dashboard component
  hand-rolls button/card/input CSS.
- **Data-driven cards and lists** — stat cards, meeting-type cards, nav
  items, and meeting rows all render from typed data modules, not
  hardcoded JSX, so content changes are data edits.
- **Centralized provider styling** — `meeting-platform-icon.tsx` and
  its `PROVIDER_LABEL` map are the single place platform
  color/label/glyph logic lives; every consumer (meeting rows, schedule
  items, search results, the integrations page) imports from there.
- **Deterministic calendar math** — `lib/calendar.ts`'s month-grid and
  month-shift functions are pure and reused everywhere a calendar grid
  is needed (the mini calendar and the full `/calendar` page), instead
  of being duplicated.
- **Local mock data, typed against real schemas** — mock meetings/
  contacts are typed against the same Zod schemas real API data would
  use, not a parallel "fake" shape, so swapping in a real data source
  later doesn't require a type rewrite.
- **No unnecessary dependencies** — platform logos are self-hosted local
  SVGs rather than an icon-pack dependency; illustrations are hand-built
  SVGs rather than a stock-illustration library; there is no CSS-in-JS
  library, no separate state-management-plus-forms stack beyond Zustand
  and native form state.
- **Preserving existing primitives/architecture** — later phases (the
  functional layer, the logo fix, this visual-correction pass) were
  each scoped to touch only the files a task actually required, leaving
  validated geometry and unrelated components untouched.

## Scripts

Directly from `package.json`:

| Script | Command |
| --- | --- |
| `npm run dev` | `next dev` |
| `npm run build` | `next build` |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | `prettier --write .` |
| `npm run format:check` | `prettier --check .` |

## Current Scope / Future Work

**Implemented:** everything described in [Features](#features) above —
all client-side, all real interactions against local state.

**Not implemented (by design, not by oversight):**

- **Backend integration** — there is no API layer; `src/data/*` is the
  entire data source, held in memory via Zustand (a full page reload
  resets it).
- **Real authentication** — the account menu and sign-out are real UI
  with a real toast, but there's no session to actually create or end.
- **Real calendar-provider integration** — Google Meet/Zoom/Teams are
  represented with authentic branding on meeting rows, but no OAuth or
  live meeting-join flow exists.
- **Persisted meeting creation** — new meetings live in the in-memory
  store only; nothing is written to a database or synced across
  sessions/devices.
- **Notification persistence** — notifications are seeded mock data;
  "mark all as read" updates local state only, with nothing to persist
  it server-side.
- **Committed automated test suite** — QA has been Playwright-driven but
  ad hoc (see [Visual QA](#visual-qa)); there's no `npm run test` script
  or CI pipeline yet.
