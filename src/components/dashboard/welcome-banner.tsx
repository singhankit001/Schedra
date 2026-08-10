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
 */
export function WelcomeBanner() {
  return (
    <section
      aria-labelledby="welcome-banner-heading"
      className="from-banner-from to-banner-to relative flex h-52 w-full items-center overflow-hidden rounded-xl bg-linear-to-br px-8 py-7"
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
      <WelcomeIllustration className="pointer-events-none absolute -right-2 -bottom-2" />
    </section>
  );
}
