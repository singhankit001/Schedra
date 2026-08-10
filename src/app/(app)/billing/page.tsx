"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockAccount } from "@/data/mock-account";
import { useAppStore } from "@/stores/app-store";

const PLAN_LABELS = {
  starter: "Starter Plan",
  pro: "Pro Plan",
  business: "Business Plan",
} as const;

const MOCK_INVOICES = [
  { id: "inv-1", date: "2026-07-01", amount: "$0.00", status: "Paid" },
  { id: "inv-2", date: "2026-06-01", amount: "$0.00", status: "Paid" },
];

/** Billing — current plan (from `mockAccount`) + a mock invoice history.
 * "Upgrade to Pro" here opens the same real `UpgradeModal` the sidebar
 * does, not a second implementation. No payment backend exists, so
 * nothing here claims to process a real charge. */
export default function BillingPage() {
  const openModal = useAppStore((state) => state.openModal);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Billing" description="Manage your plan and view invoice history." />

      <Card className="flex items-center justify-between">
        <div>
          <p className="text-label text-ink-muted">Current plan</p>
          <p className="text-heading text-ink mt-1">{PLAN_LABELS[mockAccount.plan]}</p>
        </div>
        <Button variant="primary" onClick={() => openModal({ type: "upgrade" })}>
          Upgrade to Pro
        </Button>
      </Card>

      <Card role="region" aria-label="Invoice history" className="flex flex-col">
        <p className="text-label text-ink-muted mb-3">Invoice history</p>
        <ul className="flex flex-col">
          {MOCK_INVOICES.map((invoice, index) => (
            <li
              key={invoice.id}
              className={`flex items-center justify-between py-3 ${index === MOCK_INVOICES.length - 1 ? "" : "border-border-divider border-b"}`}
            >
              <span className="text-body-sm text-ink">{invoice.date}</span>
              <span className="text-body-sm text-ink-muted">{invoice.amount}</span>
              <Badge variant="success">{invoice.status}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
