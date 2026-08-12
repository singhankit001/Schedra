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
            // A fixed-width, non-wrapping row (40px label + two 128px time
            // inputs) overflowed horizontally well before mobile widths.
            // `flex-col`/`sm:flex-row` stacks the day toggle above its
            // hours below `sm` (600px); `flex-wrap` on the time-input group
            // is the real overflow safety net beyond that (rather than
            // chasing exact pixel widths per input) — it absorbs anything
            // that still doesn't fit by wrapping "to"/the end time below,
            // never by forcing the page wider than the viewport.
            <div
              key={day}
              className={`flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-4 ${index === DAYS.length - 1 ? "" : "border-border-divider border-b"}`}
            >
              <label className="flex w-full items-center gap-2 sm:w-40 sm:shrink-0">
                <input
                  type="checkbox"
                  checked={value.enabled}
                  onChange={(e) => updateDay(day, { enabled: e.target.checked })}
                  className="accent-brand-800 h-4 w-4 shrink-0"
                />
                <span className="text-body text-ink font-medium">{day}</span>
              </label>
              {value.enabled ? (
                <div className="flex flex-wrap items-center gap-2 pl-6 sm:pl-0">
                  <Input
                    type="time"
                    label={`${day} start`}
                    hideLabel
                    value={value.start}
                    onChange={(e) => updateDay(day, { start: e.target.value })}
                    wrapperClassName="w-28"
                  />
                  <span className="text-body-sm text-ink-muted">to</span>
                  <Input
                    type="time"
                    label={`${day} end`}
                    hideLabel
                    value={value.end}
                    onChange={(e) => updateDay(day, { end: e.target.value })}
                    wrapperClassName="w-28"
                  />
                </div>
              ) : (
                <span className="text-body-sm text-ink-muted pl-6 sm:pl-0">Unavailable</span>
              )}
            </div>
          );
        })}
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          className="w-full sm:w-auto"
          onClick={() => showToast("Availability saved", "success")}
        >
          Save availability
        </Button>
      </div>
    </div>
  );
}
