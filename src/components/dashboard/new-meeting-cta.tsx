import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * "New Meeting" CTA — sits directly beneath Today's Schedule, full
 * right-column width. layout.md §13 / components.md → New Meeting CTA:
 * 376×48px, radius 12px, solid brand-green fill, white text, "+" icon
 * (16×16) + 8px gap + label, centered. No conflict between the two spec
 * files here — both agree on every value.
 *
 * Built entirely on the existing `Button` primitive, zero extension:
 * `size="lg"` is already 48px/`rounded-md` (12px) — reserved for exactly
 * this button since Phase 2/3 (see DESIGN_SYSTEM.md's radius-scale and
 * Button tables, which name "New Meeting" explicitly). `variant="primary"`
 * is already brand-800 fill / white text, and `Button`'s base layout
 * already centers content with an 8px icon→label gap. The only thing new
 * here is `w-full` — unlike Join/Upgrade Now, this button spans its full
 * container (the 376px `w-col-right` column), so its width is derived
 * from that existing token rather than hardcoded.
 *
 * No click behavior wired up — consistent with every other placeholder
 * action in the app so far (Join, kebabs, "Copy link", search).
 * Creating a real meeting needs a form/modal and a backend, both out of
 * this phase's explicit scope.
 */
export function NewMeetingCta() {
  return (
    <Button
      variant="primary"
      size="lg"
      leadingIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
      className="w-full"
    >
      New Meeting
    </Button>
  );
}
