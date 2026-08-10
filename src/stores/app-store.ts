import { create } from "zustand";
import { Video } from "lucide-react";
import type { Meeting, MeetingProvider } from "@/types/meeting";
import type { MeetingFormat } from "@/types/meeting-type";
import type { Contact } from "@/types/contact";
import type { Notification } from "@/types/notification";
import { mockUpcomingMeetings } from "@/data/mock-meetings";
import { mockCalendarEvents } from "@/data/mock-calendar-events";
import { mockNotifications } from "@/data/mock-notifications";
import { MEETING_TYPE_CARDS, type MeetingTypeCardData } from "@/data/mock-meeting-types";
import {
  CALENDAR_INITIAL_MONTH,
  CALENDAR_INITIAL_YEAR,
  CALENDAR_SELECTED_DATE,
} from "@/data/mock-calendar";
import { shiftMonth } from "@/lib/calendar";

export type ToastVariant = "success" | "info" | "error";

export interface ToastRecord {
  id: string;
  message: string;
  variant: ToastVariant;
}

export type ModalState =
  | { type: "none" }
  | { type: "new-meeting" }
  | { type: "meeting-details"; meetingId: string }
  | { type: "cancel-meeting"; meetingId: string }
  | { type: "upgrade" }
  | { type: "account-menu" }
  | { type: "edit-meeting-type"; meetingTypeId: string }
  | { type: "delete-meeting-type"; meetingTypeId: string };

export interface NewMeetingInput {
  title: string;
  meetingTypeId: string | null;
  date: string; // yyyy-mm-dd, local wall-clock input from a <input type="date">
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  provider: MeetingProvider;
  participantNames: string[];
  notes: string;
}

let idCounter = 0;
/** Deterministic-enough id generator for client-created records — avoids
 * pulling in a uuid dependency for a local-only mock data layer. */
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface AppState {
  meetings: Meeting[];
  meetingTypes: MeetingTypeCardData[];
  notifications: Notification[];
  toasts: ToastRecord[];
  modal: ModalState;

  calendarYear: number;
  calendarMonth: number;
  selectedDate: string;

  searchQuery: string;
  isSearchOpen: boolean;

  createMeeting: (input: NewMeetingInput) => Meeting;
  cancelMeeting: (id: string) => void;

  markAllNotificationsRead: () => void;

  setCalendarCursor: (year: number, month: number) => void;
  shiftCalendarMonth: (delta: number) => void;
  selectDate: (isoDate: string) => void;

  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;

  showToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;

  openModal: (modal: ModalState) => void;
  closeModal: () => void;

  renameMeetingType: (id: string, name: string) => void;
  deleteMeetingType: (id: string) => void;
  createMeetingType: (input: {
    name: string;
    durationMinutes: number;
    format: MeetingFormat;
  }) => void;
}

/**
 * Single Zustand store for every piece of dashboard state that needs to
 * be shared across components (header, sidebar, dashboard widgets, and
 * the new route pages) rather than duplicated per-component `useState`.
 * No backend exists — every mutation is local/in-memory, seeded from the
 * existing `src/data/mock-*` modules so the dashboard's already-validated
 * default content (today's 4 meetings, the 4 meeting types, May 2025 with
 * the 20th selected) is unchanged on first load.
 */
export const useAppStore = create<AppState>((set, get) => ({
  meetings: [...mockUpcomingMeetings, ...mockCalendarEvents],
  meetingTypes: MEETING_TYPE_CARDS,
  notifications: mockNotifications,
  toasts: [],
  modal: { type: "none" },

  calendarYear: CALENDAR_INITIAL_YEAR,
  calendarMonth: CALENDAR_INITIAL_MONTH,
  selectedDate: CALENDAR_SELECTED_DATE,

  searchQuery: "",
  isSearchOpen: false,

  createMeeting: (input) => {
    const startsAt = new Date(`${input.date}T${input.startTime}:00`).toISOString();
    const endsAt = new Date(`${input.date}T${input.endTime}:00`).toISOString();
    const meeting: Meeting = {
      id: nextId("meeting"),
      title: input.title,
      subtitle: input.participantNames[0] ? `with ${input.participantNames.join(", ")}` : undefined,
      startsAt,
      endsAt,
      provider: input.provider,
      status: "scheduled",
      attendees: input.participantNames.map((name) => ({
        id: nextId("contact"),
        name,
        email: `${slugify(name) || "guest"}@example.com`,
      })),
      notes: input.notes || undefined,
    };
    set((state) => ({ meetings: [meeting, ...state.meetings] }));
    return meeting;
  },

  cancelMeeting: (id) => {
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, status: "cancelled" } : meeting,
      ),
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    }));
  },

  setCalendarCursor: (year, month) => set({ calendarYear: year, calendarMonth: month }),

  shiftCalendarMonth: (delta) => {
    const { calendarYear, calendarMonth } = get();
    const next = shiftMonth(calendarYear, calendarMonth, delta);
    set({ calendarYear: next.year, calendarMonth: next.month });
  },

  selectDate: (isoDate) => set({ selectedDate: isoDate }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: "" }),

  showToast: (message, variant = "success") => {
    const id = nextId("toast");
    set((state) => ({ toasts: [...state.toasts, { id, message, variant }] }));
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: { type: "none" } }),

  renameMeetingType: (id, name) => {
    set((state) => ({
      meetingTypes: state.meetingTypes.map((card) =>
        card.meetingType.id === id ? { ...card, meetingType: { ...card.meetingType, name } } : card,
      ),
    }));
  },
  deleteMeetingType: (id) => {
    set((state) => ({
      meetingTypes: state.meetingTypes.filter((card) => card.meetingType.id !== id),
    }));
  },
  createMeetingType: (input) => {
    set((state) => ({
      meetingTypes: [
        ...state.meetingTypes,
        {
          meetingType: {
            id: nextId("meeting-type"),
            name: input.name,
            durationMinutes: input.durationMinutes,
            format: input.format,
            bookingUrl: `https://meetplan.app/book/${slugify(input.name)}`,
          },
          icon: Video,
          accent: "neutral",
        },
      ],
    }));
  },
}));

/** Meetings whose `startsAt` falls on the given UTC calendar day
 * ("YYYY-MM-DD"), excluding cancelled ones — the same UTC-pinned
 * comparison `formatMeetingDay` already uses (`src/lib/meeting-time.ts`),
 * so "today" resolves consistently everywhere. */
export function getMeetingsForDate(meetings: Meeting[], isoDate: string): Meeting[] {
  return meetings.filter(
    (meeting) => meeting.startsAt.slice(0, 10) === isoDate && meeting.status !== "cancelled",
  );
}

/** Every unique contact (deduped by email) across every meeting's
 * attendees — the `/contacts` page's data source. There's no separate
 * contacts table; contacts are derived from who's actually been invited
 * to something, which is the only contact data this app really has. */
export function getAllContacts(meetings: Meeting[]): Contact[] {
  const seen = new Map<string, Contact>();
  for (const meeting of meetings) {
    for (const contact of meeting.attendees) {
      if (!seen.has(contact.email)) seen.set(contact.email, contact);
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export interface SearchResult {
  id: string;
  title: string;
  category: "Meeting" | "Contact" | "Meeting type";
  meta: string;
  href: string;
}

/** Pure search over the store's own data — meetings (by title/subtitle),
 * contacts (deduped by email from every meeting's attendees), and
 * meeting types (by name). Used by both the header search panel and the
 * Cmd/Ctrl+K shortcut so there's exactly one search implementation. */
export function searchAll(
  query: string,
  meetings: Meeting[],
  meetingTypes: MeetingTypeCardData[],
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const meeting of meetings) {
    if (meeting.status === "cancelled") continue;
    const haystack = `${meeting.title} ${meeting.subtitle ?? ""}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        id: meeting.id,
        title: meeting.title,
        category: "Meeting",
        meta: meeting.subtitle ?? "",
        href: "/meetings",
      });
    }
  }

  const seenContacts = new Set<string>();
  for (const meeting of meetings) {
    for (const contact of meeting.attendees) {
      if (seenContacts.has(contact.email)) continue;
      const haystack = `${contact.name} ${contact.email} ${contact.company ?? ""}`.toLowerCase();
      if (haystack.includes(q)) {
        seenContacts.add(contact.email);
        results.push({
          id: contact.id,
          title: contact.name,
          category: "Contact",
          meta: contact.company ?? contact.email,
          href: "/contacts",
        });
      }
    }
  }

  for (const card of meetingTypes) {
    if (card.meetingType.name.toLowerCase().includes(q)) {
      results.push({
        id: card.meetingType.id,
        title: card.meetingType.name,
        category: "Meeting type",
        meta: `${card.meetingType.durationMinutes} mins`,
        href: "/meeting-types",
      });
    }
  }

  return results.slice(0, 8);
}
