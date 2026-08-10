"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MeetingPlatformIcon } from "@/components/dashboard/meeting-platform-icon";
import { Contact, CalendarDays, Video } from "lucide-react";
import { useDismissablePopover } from "@/lib/use-dismissable-popover";
import { searchAll, useAppStore, type SearchResult } from "@/stores/app-store";
import type { Meeting } from "@/types/meeting";

const CATEGORY_ICON: Record<SearchResult["category"], typeof Video> = {
  Meeting: Video,
  Contact: Contact,
  "Meeting type": CalendarDays,
};

/**
 * Header search field. components.md → Header: 384×44px, radius-sm
 * (10px), 16×16 magnifier icon, 14px/400 placeholder, a small "⌘K"
 * kbd-hint chip inset on the right.
 *
 * Real search-as-you-type over the store's meetings/contacts/meeting
 * types (`searchAll`, `src/stores/app-store.ts`): focusing or clicking
 * the input opens a results panel below it; `Cmd`/`Ctrl`+K focuses it
 * from anywhere on the page (this component is mounted once, in the
 * shared header, so the listener is effectively global); clicking a
 * result navigates to that entity's list page.
 */
export function DashboardSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { open, setOpen, containerRef } = useDismissablePopover<HTMLDivElement>();
  const query = useAppStore((state) => state.searchQuery);
  const setQuery = useAppStore((state) => state.setSearchQuery);
  const meetings = useAppStore((state) => state.meetings);
  const meetingTypes = useAppStore((state) => state.meetingTypes);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [setOpen]);

  const results = searchAll(query, meetings, meetingTypes);

  function goToResult(result: SearchResult) {
    setOpen(false);
    setQuery("");
    router.push(result.href);
  }

  return (
    <div ref={containerRef} className="relative w-96 shrink-0">
      <Input
        ref={inputRef}
        type="text"
        label="Search"
        hideLabel
        placeholder="Search meetings, contacts, etc..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        leadingIcon={<Search className="h-4 w-4" aria-hidden="true" strokeWidth={2} />}
        trailingSlot={
          <kbd className="text-ink-muted bg-surface-alt border-border shrink-0 rounded border px-1.5 py-0.5 font-sans text-xs">
            ⌘K
          </kbd>
        }
      />

      {open && query.trim() ? (
        <div
          role="listbox"
          aria-label="Search results"
          className="bg-surface border-border shadow-shell absolute top-full left-0 z-40 mt-2 w-full rounded-md border p-1"
        >
          {results.length === 0 ? (
            <p className="text-body-sm text-ink-muted px-3 py-4 text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((result) => {
              const Icon = CATEGORY_ICON[result.category];
              const meeting =
                result.category === "Meeting"
                  ? meetings.find((m: Meeting) => m.id === result.id)
                  : undefined;
              return (
                <button
                  key={`${result.category}-${result.id}`}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => goToResult(result)}
                  className="hover:bg-surface-alt focus-visible:ring-brand-800 flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left focus-visible:ring-2 focus-visible:outline-none"
                >
                  {meeting ? (
                    <MeetingPlatformIcon provider={meeting.provider} size={18} />
                  ) : (
                    <Icon className="text-ink-muted h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-body-sm text-ink truncate font-medium">
                      {result.title}
                    </span>
                    {result.meta ? (
                      <span className="text-caption text-ink-muted truncate">{result.meta}</span>
                    ) : null}
                  </span>
                  <span className="text-micro text-ink-muted shrink-0">{result.category}</span>
                </button>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}
