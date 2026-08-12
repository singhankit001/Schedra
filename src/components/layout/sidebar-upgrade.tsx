"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { UpgradeIllustration } from "@/components/illustrations/upgrade-illustration";
import { useAppStore } from "@/stores/app-store";

/**
 * Upgrade-to-Pro promo card. Not built on the `Card` primitive — mirrors
 * `Card`'s exact color recipe (`bg-surface` + `border-border` +
 * `shadow-card`) by hand instead of importing it, since the card's
 * internal padding (16px, `p-4`) doesn't match any of `Card`'s padding
 * scale steps exactly at this content density; keeping it a bespoke `div`
 * avoids fighting the primitive's own padding options for one card.
 *
 * "Upgrade Now" opens a real modal (`UpgradeModal`) rather than a dead
 * button — no billing backend exists, so it shows the plan's real
 * feature list and hands off to the actual `/billing` page instead of
 * faking a checkout flow.
 */
export function SidebarUpgrade() {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <div className="bg-surface border-border shadow-card flex flex-col items-center gap-3 rounded-lg border p-4 text-center">
      <UpgradeIllustration />
      <div className="flex flex-col gap-1">
        <p className="text-ink text-base font-semibold">Upgrade to Pro</p>
        <p className="text-ink-muted text-xs">Unlock advanced features and grow your business.</p>
      </div>
      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={() => openModal({ type: "upgrade" })}
      >
        Upgrade Now
      </Button>
    </div>
  );
}

/**
 * Rail-mode stand-in for `SidebarUpgrade` — the illustrated promo card
 * (illustration + 2 lines of copy + a full-width button) has no room in
 * the 80px tablet rail (768–1199px), so the persistent sidebar swaps it
 * for a single centered icon button that opens the exact same
 * `UpgradeModal`, preserving the feature rather than just hiding it. Only
 * ever rendered inside the rail tier (`Sidebar` wraps it `lg:hidden`) —
 * the mobile drawer and the full desktop sidebar both use the real
 * `SidebarUpgrade` card instead.
 */
export function SidebarUpgradeCompact() {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <div className="flex justify-center">
      <IconButton
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
        aria-label="Upgrade to Pro"
        title="Upgrade to Pro"
        size="lg"
        variant="solid"
        onClick={() => openModal({ type: "upgrade" })}
      />
    </div>
  );
}
