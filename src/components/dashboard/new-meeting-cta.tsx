"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

/**
 * "New Meeting" CTA — sits directly beneath Today's Schedule, full
 * right-column width. layout.md §13 / components.md → New Meeting CTA:
 * 376×48px, radius 12px, solid brand-green fill, white text, "+" icon
 * (16×16) + 8px gap + label, centered. Built entirely on the existing
 * `Button` primitive (`size="lg"`, `variant="primary"`), zero extension.
 *
 * Opens the real `NewMeetingModal` (form + validation + store write) —
 * no longer a dead button. A meeting created for today appears in
 * "Upcoming Meetings", "Today's Schedule", and the "Upcoming Meetings"
 * stat immediately, since all three now read the same store.
 */
export function NewMeetingCta() {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <Button
      variant="primary"
      size="lg"
      leadingIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
      className="w-full"
      onClick={() => openModal({ type: "new-meeting" })}
    >
      New Meeting
    </Button>
  );
}
