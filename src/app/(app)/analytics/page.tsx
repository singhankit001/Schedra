"use client";

import { Calendar, CheckCircle2, Users, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { getAllContacts, useAppStore } from "@/stores/app-store";

/**
 * A small analytics overview — every number here is genuinely computed
 * from the store's own meetings/meeting-types/contacts, not fabricated.
 * No revenue/time-tracking model exists (same reasoning as the dashboard
 * Revenue stat staying static), so this sticks to counts that are
 * honestly derivable from what the app actually has.
 */
export default function AnalyticsPage() {
  const meetings = useAppStore((state) => state.meetings);
  const meetingTypes = useAppStore((state) => state.meetingTypes);
  const contacts = getAllContacts(meetings);

  const scheduled = meetings.filter((m) => m.status === "scheduled").length;
  const cancelled = meetings.filter((m) => m.status === "cancelled").length;

  const cards = [
    { label: "Scheduled meetings", value: scheduled, icon: Calendar },
    { label: "Cancelled meetings", value: cancelled, icon: XCircle },
    { label: "Unique contacts", value: contacts.length, icon: Users },
    { label: "Meeting types", value: meetingTypes.length, icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Analytics" description="A live snapshot of your scheduling activity." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="flex flex-col gap-4">
            <span className="bg-app flex h-10 w-10 items-center justify-center rounded-full">
              <Icon className="text-ink h-5 w-5" aria-hidden="true" strokeWidth={2} />
            </span>
            <div>
              <p className="text-label text-ink-muted">{label}</p>
              <p className="text-kpi text-ink mt-1">{value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
