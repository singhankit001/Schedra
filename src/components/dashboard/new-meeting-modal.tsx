"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { PROVIDER_LABEL } from "@/components/dashboard/meeting-platform-icon";
import { useAppStore, type NewMeetingInput } from "@/stores/app-store";
import { getTodayIsoDate } from "@/lib/meeting-time";
import type { MeetingProvider } from "@/types/meeting";

const PROVIDERS: MeetingProvider[] = ["google-meet", "zoom", "microsoft-teams"];

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = (h * 60 + m + minutes + 24 * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

interface FormState {
  title: string;
  meetingTypeId: string;
  date: string;
  startTime: string;
  endTime: string;
  provider: MeetingProvider;
  notes: string;
}

function initialFormState(): FormState {
  return {
    title: "",
    meetingTypeId: "",
    date: getTodayIsoDate(),
    startTime: "09:00",
    endTime: "09:30",
    provider: "google-meet",
    notes: "",
  };
}

/**
 * "+ New Meeting" form. Real client-side validation (title required,
 * date/times required, end after start), real state on submit
 * (`createMeeting`), and — because `UpcomingMeetings`/`TodaysSchedule`/
 * the "Upcoming Meetings" stat now all read from the same store — a
 * meeting created for today appears in every one of those places
 * immediately, with no page reload.
 */
export function NewMeetingModal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const createMeeting = useAppStore((state) => state.createMeeting);
  const showToast = useAppStore((state) => state.showToast);
  const meetingTypes = useAppStore((state) => state.meetingTypes);

  const [form, setForm] = useState<FormState>(initialFormState);
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantDraft, setParticipantDraft] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const open = modal.type === "new-meeting";
  if (!open) return null;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleMeetingTypeChange(id: string) {
    updateField("meetingTypeId", id);
    const selected = meetingTypes.find((card) => card.meetingType.id === id);
    if (selected) {
      updateField("endTime", addMinutes(form.startTime, selected.meetingType.durationMinutes));
    }
  }

  function addParticipant() {
    const name = participantDraft.trim();
    if (!name) return;
    setParticipants((prev) => [...prev, name]);
    setParticipantDraft("");
  }

  function removeParticipant(name: string) {
    setParticipants((prev) => prev.filter((p) => p !== name));
  }

  function handleClose() {
    setForm(initialFormState());
    setParticipants([]);
    setParticipantDraft("");
    setErrors({});
    closeModal();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.date) nextErrors.date = "Date is required.";
    if (!form.startTime) nextErrors.startTime = "Start time is required.";
    if (!form.endTime) nextErrors.endTime = "End time is required.";
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      nextErrors.endTime = "End time must be after the start time.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const input: NewMeetingInput = {
      title: form.title.trim(),
      meetingTypeId: form.meetingTypeId || null,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      provider: form.provider,
      participantNames: participants,
      notes: form.notes.trim(),
    };
    createMeeting(input);
    showToast(`"${input.title}" was created`, "success");
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="New Meeting"
      description="Schedule a meeting — it'll appear on your dashboard immediately."
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Meeting title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          error={errors.title}
          placeholder="e.g. Design Review"
        />

        <Select
          label="Meeting type (optional)"
          value={form.meetingTypeId}
          onChange={(e) => handleMeetingTypeChange(e.target.value)}
        >
          <option value="">Custom</option>
          {meetingTypes.map((card) => (
            <option key={card.meetingType.id} value={card.meetingType.id}>
              {card.meetingType.name}
            </option>
          ))}
        </Select>

        {/* `grid-cols-1` below `sm` (600px): at 3 columns inside a
            near-full-bleed mobile dialog, native date/time pickers
            shrink to ~90px each — cramped rather than unusable, but not
            the comfortable, "designed for touch" target this needs.
            `sm:grid-cols-3` is the exact original desktop layout,
            unchanged, since the dialog is already `sm:max-w-lg` there. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Input
            type="date"
            label="Date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            error={errors.date}
          />
          <Input
            type="time"
            label="Start time"
            value={form.startTime}
            onChange={(e) => updateField("startTime", e.target.value)}
            error={errors.startTime}
          />
          <Input
            type="time"
            label="End time"
            value={form.endTime}
            onChange={(e) => updateField("endTime", e.target.value)}
            error={errors.endTime}
          />
        </div>

        <Select
          label="Platform"
          value={form.provider}
          onChange={(e) => updateField("provider", e.target.value as MeetingProvider)}
        >
          {PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {PROVIDER_LABEL[provider]}
            </option>
          ))}
        </Select>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="new-meeting-participant" className="text-body text-ink font-medium">
            Participants (optional)
          </label>
          <div className="flex gap-2">
            <Input
              id="new-meeting-participant"
              value={participantDraft}
              onChange={(e) => setParticipantDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addParticipant();
                }
              }}
              placeholder="Add a name and press Enter"
              wrapperClassName="flex-1"
            />
            <Button type="button" variant="secondary" onClick={addParticipant}>
              Add
            </Button>
          </div>
          {participants.length > 0 ? (
            <ul className="flex flex-wrap gap-2 pt-1">
              {participants.map((name) => (
                <li
                  key={name}
                  className="bg-surface-alt text-body-sm text-ink flex items-center gap-1.5 rounded-full py-1 pr-2 pl-3"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeParticipant(name)}
                    aria-label={`Remove ${name}`}
                    className="text-ink-muted hover:text-ink focus-visible:ring-brand-800 rounded-full focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="new-meeting-notes" className="text-body text-ink font-medium">
            Notes (optional)
          </label>
          <textarea
            id="new-meeting-notes"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            rows={3}
            className="border-border bg-surface text-body text-ink focus:ring-offset-app focus:ring-brand-800 w-full resize-none rounded-sm border p-3 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Meeting
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
