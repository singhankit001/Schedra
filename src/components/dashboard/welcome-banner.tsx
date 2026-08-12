import { WelcomeIllustration } from "@/components/dashboard/welcome-illustration";

/**
 * Welcome banner. layout.md §7 / components.md → Welcome banner: 776px
 * wide (set by the parent column, not here — see dashboard/page.tsx),
 * ~208px tall, radius-xl (20px), warm cream→peach gradient, 32px
 * left / 28px top-bottom padding, skyline illustration bottom-right.
 *
 * Not built on `Card` — `Card`'s white surface + `shadow-card` don't
 * represent this banner's gradient background or lack of border.
 *
 * Typography: the headline is `text-display` (28/700/1.2, tracking `0`),
 * not `text-kpi` (28/700/1.2, tracking `-0.01em`) — same size, different
 * role, per the Phase 2 audit this phase was explicitly told not to
 * regress.
 *
 * Responsive: the skyline illustration is a fixed 340×160px SVG (real
 * `width`/`height` attributes, not viewport-scaled) — clipped safely by
 * the banner's own `overflow-hidden` at any width (no page-level
 * overflow risk), but on a narrow phone banner it would visually collide
 * with the greeting text instead of reading as a clipped background
 * flourish. responsive.md flagged this exact question as unresolved
 * ("whether the welcome-banner illustration hides below a width
 * threshold") — resolved here: hidden below `sm` (600px), where content
 * takes priority over decoration; unchanged from `sm` up. Padding steps
 * down slightly below `sm` (`px-8 py-7` → `px-5 py-6`) for the same
 * "density tightens on the narrowest screens" rhythm the rest of the app
 * already uses.
 */
export function WelcomeBanner() {
  return (
    <section
      aria-labelledby="welcome-banner-heading"
      className="from-banner-from to-banner-to relative flex h-52 w-full items-center overflow-hidden rounded-xl bg-linear-to-br px-5 py-6 sm:px-8 sm:py-7"
    >
      <div className="relative z-10 flex max-w-sm flex-col gap-2">
        <p className="text-md text-ink font-normal">Good Morning,</p>
        <h1 id="welcome-banner-heading" className="text-display text-ink">
          Welcome back! <span aria-hidden="true">👋</span>
        </h1>
        <p className="text-ink-muted text-base leading-[1.5]">
          You have <span className="text-accent-orange font-bold">8</span> meetings today.
        </p>
      </div>
      <WelcomeIllustration className="pointer-events-none absolute -right-2 -bottom-2 hidden sm:block" />
    </section>
  );
}
