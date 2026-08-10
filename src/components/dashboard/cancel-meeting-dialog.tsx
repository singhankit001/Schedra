"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

/** Confirmation gate in front of `cancelMeeting` — "Cancel meeting should
 * require confirmation," per the brief. No state changes until the user
 * explicitly confirms. */
export function CancelMeetingDialog() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const cancelMeeting = useAppStore((state) => state.cancelMeeting);
  const showToast = useAppStore((state) => state.showToast);
  const meetings = useAppStore((state) => state.meetings);

  const open = modal.type === "cancel-meeting";
  const meeting = open ? meetings.find((m) => m.id === modal.meetingId) : undefined;

  if (!open || !meeting) return null;

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      title="Cancel this meeting?"
      description={`"${meeting.title}" will be marked as cancelled. This can't be undone.`}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={closeModal}>
          Keep meeting
        </Button>
        <Button
          variant="primary"
          className="bg-danger hover:bg-danger/90"
          onClick={() => {
            cancelMeeting(meeting.id);
            showToast(`"${meeting.title}" was cancelled`, "success");
            closeModal();
          }}
        >
          Cancel meeting
        </Button>
      </div>
    </Dialog>
  );
}
