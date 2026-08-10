import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Header search field. components.md → Header: 384×44px, radius-sm
 * (10px), 16×16 magnifier icon, 14px/400 placeholder, a small "⌘K"
 * kbd-hint chip inset on the right. No search functionality yet — this is
 * a real, accessible input with a static placeholder.
 *
 * Built on the `Input` primitive (already 44px/`rounded-sm` with matching
 * icon-slot conventions) rather than a bespoke field.
 */
export function DashboardSearch() {
  return (
    <Input
      type="text"
      label="Search"
      hideLabel
      placeholder="Search meetings, contacts, etc..."
      leadingIcon={<Search className="h-4 w-4" aria-hidden="true" strokeWidth={2} />}
      trailingSlot={
        <kbd className="text-ink-muted bg-surface-alt border-border shrink-0 rounded border px-1.5 py-0.5 font-sans text-xs">
          ⌘K
        </kbd>
      }
      wrapperClassName="w-96 shrink-0"
    />
  );
}
