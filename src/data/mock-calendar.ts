/**
 * Deterministic initial state for the mini calendar (Phase 8). The
 * reference explicitly shows "May 2025" with the 20th selected
 * (components.md's "Selected date (20)" / qa-checklist.md's "Date '20'
 * shown as selected") — reproduced exactly rather than derived from the
 * real current date, so the widget (and any Playwright/QA screenshot)
 * renders the same grid every time, independent of when it's viewed.
 */
export const CALENDAR_INITIAL_YEAR = 2025;
export const CALENDAR_INITIAL_MONTH = 4; // 0-indexed: May

export const CALENDAR_SELECTED_DATE = "2025-05-20";

/**
 * Dates that render the small event dot. No visual-spec file enumerates
 * which specific days have events — only that some do — so this set is
 * invented, not sampled, chosen to include the selected date plus a
 * plausible scatter of weekdays. UNVERIFIED against the reference.
 */
export const CALENDAR_EVENT_DATES: string[] = [
  "2025-05-06",
  "2025-05-12",
  "2025-05-14",
  "2025-05-20",
  "2025-05-22",
  "2025-05-28",
];
