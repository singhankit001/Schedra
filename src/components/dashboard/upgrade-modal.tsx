"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const PRO_FEATURES = [
  "Unlimited meeting types",
  "Team scheduling & round-robin",
  "Custom branding on booking pages",
  "Priority support",
];

/**
 * Upgrade-to-Pro modal, opened from the sidebar's "Upgrade Now" button.
 * No real billing/payment backend exists, so "Continue" doesn't fake a
 * checkout — it navigates to the real `/billing` page, an honest
 * next step for a demo app.
 */
export function UpgradeModal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const router = useRouter();

  const open = modal.type === "upgrade";
  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      title="Upgrade to Pro"
      description="Unlock advanced features and grow your business."
    >
      <ul className="flex flex-col gap-2">
        {PRO_FEATURES.map((feature) => (
          <li key={feature} className="text-body-sm text-ink flex items-center gap-2">
            <Check className="text-brand-600 h-4 w-4 shrink-0" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={closeModal}>
          Not now
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            closeModal();
            router.push("/billing");
          }}
        >
          Continue to Billing
        </Button>
      </div>
    </Dialog>
  );
}
