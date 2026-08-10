"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/dashboard/page-header";
import { useAppStore } from "@/stores/app-store";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayAvailability {
  enabled: boolean;
  start: string;
  end: string;
}

function defaultAvailability(): Record<string, DayAvailability> {
  const entries = DAYS.map((day) => [
    day,
    { enabled: day !== "Saturday" && day !== "Sunday", start: "09:00", end: "17:00" },
  ]);
  return Object.fromEntries(entries);
}

/**
 * Weekly availability — real, working local state (toggle a day on/off,
 * edit its start/end time), saved with a toast confirmation. No backend
 * exists to persist this across a reload, same as the rest of this
 * app's mock data layer; kept as page-local state rather than the
 * shared store since nothing else reads it.
 */
export default function AvailabilityPage() {
  const [availability, setAvailability] =
    useState<Record<string, DayAvailability>>(defaultAvailability);
  const showToast = useAppStore((state) => state.showToast);

  function updateDay(day: string, patch: Partial<DayAvailability>) {
    setAvailability((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Availability"
        description="Set the hours you're open for meetings each week."
      />

      <Card role="region" aria-label="Weekly availability" className="flex flex-col gap-1">
        {DAYS.map((day, index) => {
          const value = availability[day];
          return (
            <div
              key={day}
              className={`flex items-center gap-4 py-3 ${index === DAYS.length - 1 ? "" : "border-border-divider border-b"}`}
            >
              <label className="flex w-40 shrink-0 items-center gap-2">
                <input
                  type="checkbox"
                  checked={value.enabled}
                  onChange={(e) => updateDay(day, { enabled: e.target.checked })}
                  className="accent-brand-800 h-4 w-4"
                />
                <span className="text-body text-ink font-medium">{day}</span>
              </label>
              {value.enabled ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    label={`${day} start`}
                    hideLabel
                    value={value.start}
                    onChange={(e) => updateDay(day, { start: e.target.value })}
                    wrapperClassName="w-32"
                  />
                  <span className="text-body-sm text-ink-muted">to</span>
                  <Input
                    type="time"
                    label={`${day} end`}
                    hideLabel
                    value={value.end}
                    onChange={(e) => updateDay(day, { end: e.target.value })}
                    wrapperClassName="w-32"
                  />
                </div>
              ) : (
                <span className="text-body-sm text-ink-muted">Unavailable</span>
              )}
            </div>
          );
        })}
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => showToast("Availability saved", "success")}>
          Save availability
        </Button>
      </div>
    </div>
  );
}
