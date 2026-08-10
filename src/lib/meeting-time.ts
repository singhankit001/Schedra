/**
 * Display formatting for `Meeting.startsAt` (ISO datetime, always UTC per
 * `meetingSchema`'s `z.string().datetime()`).
 *
 * Both formatters pin `timeZone: "UTC"` deliberately: the mock data's
 * wall-clock hours (e.g. "09:30") are authored in UTC, and formatting
 * against the *viewer's* local timezone would make the displayed time
 * drift depending on where the app is opened/screenshotted. Pinning to
 * UTC keeps the reference-matching "09:30 AM" / "Today" strings stable
 * everywhere — a real API would supply real per-user timezone handling,
 * which this mock layer deliberately doesn't attempt (out of scope: no
 * real-time data).
 */
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  timeZone: "UTC",
});

function utcDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** "09:30 AM" */
export function formatMeetingTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

/** "Today" if the meeting falls on the current UTC calendar day, otherwise
 * the weekday name ("Tuesday"). No "Tomorrow"/"Yesterday" tier — not
 * evidenced in the reference, and every mock meeting is today's. */
export function formatMeetingDay(iso: string): string {
  const meetingDate = new Date(iso);
  const isToday = utcDateKey(meetingDate) === utcDateKey(new Date());
  return isToday ? "Today" : weekdayFormatter.format(meetingDate);
}
