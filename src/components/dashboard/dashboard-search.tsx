"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { MeetingPlatformIcon } from "@/components/dashboard/meeting-platform-icon";
import { Contact, CalendarDays, Video } from "lucide-react";
import { useDismissablePopover } from "@/lib/use-dismissable-popover";
import { searchAll, useAppStore, type SearchResult } from "@/stores/app-store";
import { cn } from "@/lib/utils";
import type { Meeting } from "@/types/meeting";

const CATEGORY_ICON: Record<SearchResult["category"], typeof Video> = {
  Meeting: Video,
  Contact: Contact,
  "Meeting type": CalendarDays,
};

/**
 * Header search field. components.md → Header: 384×44px, radius-sm
 * (10px), 16×16 magnifier icon, 14px/400 placeholder, a small "⌘K"
 * kbd-hint chip inset on the right. Unchanged from `tablet` (768px) up.
 *
 * Real search-as-you-type over the store's meetings/contacts/meeting
 * types (`searchAll`, `src/stores/app-store.ts`): focusing or clicking
 * the input opens a results panel below it; `Cmd`/`Ctrl`+K focuses it
 * from anywhere on the page (this component is mounted once, in the
 * shared header, so the listener is effectively global); clicking a
 * result navigates to that entity's list page.
 *
 * Responsive (<tablet, 768px): a fixed 384px input has no room in a
 * phone-width header once a hamburger is also present, and
 * responsive.md's own open question ("whether search becomes icon-only
 * on small screens") is resolved here — yes. Below `tablet` the field
 * collapses to a single search icon button; tapping it turns this same
 * container into a full-screen takeover (fixed, full viewport, its own
 * back button) rather than trying to cram a dropdown result panel under
 * a header-sized trigger. `open` (already tracking "should results be
 * visible") doubles as "is the mobile takeover active" — no second piece
 * of state — since below `tablet` the input/results only ever render
 * while `open` is true anyway.
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
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [setOpen]);

  // Focus the field whenever it becomes visible/open — covers both the
  // desktop/tablet case (already focused by the triggering click, this is
  // a harmless no-op re-focus) and the mobile case (the field is
  // `display:none` until `open` flips true, so it can't be focused
  // synchronously inside the trigger's own click handler).
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = searchAll(query, meetings, meetingTypes);

  function goToResult(result: SearchResult) {
    setOpen(false);
    setQuery("");
    router.push(result.href);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        open ? "bg-app fixed inset-0 z-50 flex flex-col p-3" : "shrink-0",
        "tablet:static tablet:z-auto tablet:block tablet:w-96 tablet:shrink-0 tablet:bg-transparent tablet:p-0",
      )}
    >
      <div className="flex items-center gap-2">
        {!open ? (
          <IconButton
            icon={<Search className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />}
            aria-label="Search"
            size="lg"
            variant="solid"
            className="tablet:hidden"
            onClick={() => setOpen(true)}
          />
        ) : null}

        <div className={cn(!open && "hidden", "flex-1", "tablet:block")}>
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
              <kbd className="text-ink-muted bg-surface-alt border-border tablet:inline-flex hidden shrink-0 rounded border px-1.5 py-0.5 font-sans text-xs">
                ⌘K
              </kbd>
            }
          />
        </div>

        {open ? (
          <IconButton
            icon={<X className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={2} />}
            aria-label="Close search"
            size="lg"
            variant="solid"
            className="tablet:hidden"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />
        ) : null}
      </div>

      {open && query.trim() ? (
        <div
          role="listbox"
          aria-label="Search results"
          className="bg-surface border-border shadow-shell tablet:absolute tablet:top-full tablet:left-0 tablet:w-full tablet:flex-none tablet:overflow-visible z-40 mt-2 flex-1 overflow-y-auto rounded-md border p-1"
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
