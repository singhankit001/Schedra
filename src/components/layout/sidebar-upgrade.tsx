import { Button } from "@/components/ui/button";
import { UpgradeIllustration } from "@/components/illustrations/upgrade-illustration";

/**
 * Upgrade-to-Pro promo card. Not built on the `Card` primitive — mirrors
 * `Card`'s exact color recipe (`bg-surface` + `border-border` +
 * `shadow-card`) by hand instead of importing it, since the card's
 * internal padding (16px, `p-4`) doesn't match any of `Card`'s padding
 * scale steps exactly at this content density; keeping it a bespoke `div`
 * avoids fighting the primitive's own padding options for one card.
 *
 * Corrected against the reference image (see DESIGN_SYSTEM.md, "Sidebar
 * color scheme correction"): the card is a light surface like every
 * other card in the app, not a dark sidebar-toned one.
 *
 * Button geometry: see button.tsx's `md` size comment for the Phase 3
 * resolution of the components.md/layout.md conflict (184×36, radius 8).
 * Variant is `primary` (solid brand-green fill, white text) — the
 * reference clearly shows a solid dark-green "Upgrade Now" button, the
 * same treatment as the New Meeting CTA. No focus-ring override needed
 * anymore: `Button`'s default `ring-offset-app` is already correct now
 * that this card sits on a light surface.
 */
export function SidebarUpgrade() {
  return (
    <div className="bg-surface border-border shadow-card flex flex-col items-center gap-3 rounded-lg border p-4 text-center">
      <UpgradeIllustration />
      <div className="flex flex-col gap-1">
        <p className="text-ink text-base font-semibold">Upgrade to Pro</p>
        <p className="text-ink-muted text-xs">Unlock advanced features and grow your business.</p>
      </div>
      <Button variant="primary" size="md" className="w-full">
        Upgrade Now
      </Button>
    </div>
  );
}
