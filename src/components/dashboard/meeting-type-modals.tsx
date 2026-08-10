"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/app-store";
import type { MeetingTypeCardData } from "@/data/mock-meeting-types";

interface EditMeetingTypeFormProps {
  card: MeetingTypeCardData;
  onClose: () => void;
}

/** The actual form, `key`ed by meeting-type id from the parent so
 * switching *which* card is being edited remounts this with a fresh
 * `useState(card.meetingType.name)` initializer — no effect-driven
 * setState needed to keep local state in sync with a changing prop. */
function EditMeetingTypeForm({ card, onClose }: EditMeetingTypeFormProps) {
  const renameMeetingType = useAppStore((state) => state.renameMeetingType);
  const showToast = useAppStore((state) => state.showToast);
  const [name, setName] = useState(card.meetingType.name);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        renameMeetingType(card.meetingType.id, trimmed);
        showToast("Meeting type updated", "success");
        onClose();
      }}
      className="flex flex-col gap-4"
    >
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
}

/** "Edit" — the meeting-type kebab's real action: rename in place. Kept
 * to renaming (not duration/format) to stay a genuinely small, honest
 * edit surface rather than duplicating the New Meeting form's fields for
 * a feature the reference never shows a full edit view for. */
export function EditMeetingTypeModal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const meetingTypes = useAppStore((state) => state.meetingTypes);

  const open = modal.type === "edit-meeting-type";
  const card = open
    ? meetingTypes.find((c) => c.meetingType.id === modal.meetingTypeId)
    : undefined;

  if (!open || !card) return null;

  return (
    <Dialog open={open} onClose={closeModal} title="Edit meeting type">
      <EditMeetingTypeForm key={card.meetingType.id} card={card} onClose={closeModal} />
    </Dialog>
  );
}

/** "Delete" — confirmation-gated removal from the meeting-types list. */
export function DeleteMeetingTypeModal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const meetingTypes = useAppStore((state) => state.meetingTypes);
  const deleteMeetingType = useAppStore((state) => state.deleteMeetingType);
  const showToast = useAppStore((state) => state.showToast);

  const open = modal.type === "delete-meeting-type";
  const card = open
    ? meetingTypes.find((c) => c.meetingType.id === modal.meetingTypeId)
    : undefined;

  if (!open || !card) return null;

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      title="Delete this meeting type?"
      description={`"${card.meetingType.name}" will be removed from Your Meeting Types. This can't be undone.`}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={closeModal}>
          Keep it
        </Button>
        <Button
          variant="primary"
          className="bg-danger hover:bg-danger/90"
          onClick={() => {
            deleteMeetingType(card.meetingType.id);
            showToast(`"${card.meetingType.name}" was deleted`, "success");
            closeModal();
          }}
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
}
