import type { Meeting } from "@/types/meeting";
import type { MeetingType } from "@/types/meeting-type";

/** A stable, clearly-local "share link" for a meeting — used by "Copy
 * meeting link" actions. There is no real video-conferencing backend, so
 * this deliberately never masquerades as a live joinable URL; it's a
 * genuine, working Clipboard API interaction (the copy itself is real),
 * just not a link that resolves to an actual call. */
export function getMeetingShareLink(meeting: Meeting): string {
  return meeting.joinUrl ?? `https://meetplan.app/join/${meeting.id}`;
}

/** Copies the meeting's share link via the real Clipboard API. Returns
 * whether it succeeded (the API can reject — no permission, insecure
 * context, etc. — callers should toast accordingly either way). */
export async function copyMeetingLink(meeting: Meeting): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getMeetingShareLink(meeting));
    return true;
  } catch {
    return false;
  }
}

/** Same idea, for a meeting type's own booking link. */
export function getMeetingTypeShareLink(meetingType: MeetingType): string {
  return meetingType.bookingUrl ?? `https://meetplan.app/book/${meetingType.id}`;
}

export async function copyMeetingTypeLink(meetingType: MeetingType): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(getMeetingTypeShareLink(meetingType));
    return true;
  } catch {
    return false;
  }
}
