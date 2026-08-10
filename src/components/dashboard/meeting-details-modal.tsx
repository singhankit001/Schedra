"use client";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticipantStack } from "@/components/dashboard/participant-stack";
import { MeetingPlatformIcon, PROVIDER_LABEL } from "@/components/dashboard/meeting-platform-icon";
import { formatMeetingDay, formatMeetingTime } from "@/lib/meeting-time";
import { useAppStore } from "@/stores/app-store";

/**
 * Meeting details / join modal — the honest fallback the brief itself
 * specifies for mock data: "If the app is using mock data: open a
 * meeting details/join modal with: meeting title, platform, time,
 * participants, Join Meeting CTA." No real video-conferencing backend
 * exists, so "Join Meeting" doesn't fake-launch a call — it says so via
 * a toast, which is honest rather than a silently dead button pretending
 * to work.
 */
export function MeetingDetailsModal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const showToast = useAppStore((state) => state.showToast);
  const meetings = useAppStore((state) => state.meetings);

  const open = modal.type === "meeting-details";
  const meeting = open ? meetings.find((m) => m.id === modal.meetingId) : undefined;

  if (!open || !meeting) return null;

  return (
    <Dialog open={open} onClose={closeModal} title={meeting.title} description={meeting.subtitle}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MeetingPlatformIcon provider={meeting.provider} size={20} />
          <span className="text-body-sm text-ink">{PROVIDER_LABEL[meeting.provider]}</span>
          {meeting.status === "cancelled" ? <Badge variant="warning">Cancelled</Badge> : null}
        </div>

        <div className="text-body-sm text-ink">
          {formatMeetingDay(meeting.startsAt)} · {formatMeetingTime(meeting.startsAt)}–
          {formatMeetingTime(meeting.endsAt)}
        </div>

        {meeting.attendees.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-caption text-ink-muted">Participants</p>
            <ParticipantStack participants={meeting.attendees} visibleCount={5} />
            <ul className="text-body-sm text-ink-muted flex flex-col gap-0.5">
              {meeting.attendees.map((attendee) => (
                <li key={attendee.id}>{attendee.name}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {meeting.notes ? (
          <div className="flex flex-col gap-1">
            <p className="text-caption text-ink-muted">Notes</p>
            <p className="text-body-sm text-ink whitespace-pre-wrap">{meeting.notes}</p>
          </div>
        ) : null}

        <div className="mt-2 flex justify-end gap-2">
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={meeting.status === "cancelled"}
            onClick={() =>
              showToast("This is a demo meeting — no real video call to join yet.", "info")
            }
          >
            Join Meeting
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
