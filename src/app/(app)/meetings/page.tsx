"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { MeetingRow } from "@/components/dashboard/meeting-row";
import { useAppStore } from "@/stores/app-store";

/**
 * Full meetings list — the real destination for "View all" (Upcoming
 * Meetings) and any "Meeting" search result. Reuses `MeetingRow` as-is
 * (Join/kebab both work exactly like they do on the dashboard) rather
 * than a second row implementation; every meeting in the store, sorted
 * chronologically, cancelled ones visually marked instead of hidden so
 * "Cancel meeting" has somewhere to actually show its effect.
 */
export default function MeetingsPage() {
  const meetings = useAppStore((state) => state.meetings);
  const sorted = [...meetings].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Meetings"
        description={`${sorted.length} meeting${sorted.length === 1 ? "" : "s"} total`}
      />

      <Card role="region" aria-label="All meetings" className="flex flex-col">
        {sorted.length === 0 ? (
          <p className="text-body-sm text-ink-muted py-6 text-center">No meetings yet.</p>
        ) : (
          <div className="flex flex-col">
            {sorted.map((meeting, index) => (
              <div
                key={meeting.id}
                className={meeting.status === "cancelled" ? "opacity-50" : undefined}
              >
                {meeting.status === "cancelled" ? (
                  <div className="pt-4">
                    <Badge variant="warning">Cancelled</Badge>
                  </div>
                ) : null}
                <MeetingRow meeting={meeting} isLast={index === sorted.length - 1} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
