"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { PageHeader } from "@/components/dashboard/page-header";
import { MeetingTypeCard } from "@/components/dashboard/meeting-type-card";
import { useAppStore } from "@/stores/app-store";
import type { MeetingFormat } from "@/types/meeting-type";

/**
 * Full "Your Meeting Types" list — "Manage all" lands here. Same
 * `MeetingTypeCard` the dashboard uses (Copy link / Edit / Delete all
 * work identically), plus a real "New meeting type" creation flow this
 * page owns locally (only this page needs it, so it isn't added to the
 * global modal union).
 */
export default function MeetingTypesPage() {
  const meetingTypes = useAppStore((state) => state.meetingTypes);
  const createMeetingType = useAppStore((state) => state.createMeetingType);
  const showToast = useAppStore((state) => state.showToast);

  const [createOpen, setCreateOpen] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("30");
  const [format, setFormat] = useState<MeetingFormat>("one-on-one");

  function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createMeetingType({ name: trimmed, durationMinutes: Number(duration), format });
    showToast(`"${trimmed}" was created`, "success");
    setName("");
    setDuration("30");
    setFormat("one-on-one");
    setCreateOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Your Meeting Types"
        description={`${meetingTypes.length} meeting type${meetingTypes.length === 1 ? "" : "s"}`}
        action={
          <Button
            variant="primary"
            leadingIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
            onClick={() => setCreateOpen(true)}
          >
            New meeting type
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {meetingTypes.map((card) => (
          <MeetingTypeCard key={card.meetingType.id} data={card} />
        ))}
      </div>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} title="New meeting type">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Discovery Call"
            required
            autoFocus
          />
          <Input
            type="number"
            min={5}
            step={5}
            label="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <Select
            label="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value as MeetingFormat)}
          >
            <option value="one-on-one">One-on-One</option>
            <option value="group">Group</option>
          </Select>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
