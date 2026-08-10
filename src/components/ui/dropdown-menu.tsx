"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDismissablePopover } from "@/lib/use-dismissable-popover";

export interface DropdownMenuItemConfig {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  variant?: "default" | "danger";
  /** Renders as a non-interactive divider above this item instead of a
   * menu item, when set. */
  divider?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItemConfig[];
  align?: "start" | "end";
  /** Which side of the trigger the panel opens on. `bottom` (default)
   * for triggers with room below (header controls, row kebabs); `top`
   * for triggers pinned near the bottom of the viewport (the sidebar
   * account row) so the panel doesn't render off-screen/clipped. */
  side?: "top" | "bottom";
  /** Accessible label for the menu itself (e.g. "Meeting options"). */
  label: string;
}

/**
 * Small, dependency-free dropdown menu — backs the account menu (header
 * + sidebar) and every row/card kebab menu. `trigger` is rendered as-is
 * (any existing `IconButton`/`Button`/bespoke button) and wrapped in a
 * click-toggling `<span>` rather than cloned, so it never needs to know
 * about the menu that owns it.
 *
 * Open/outside-click/Escape behavior comes from `useDismissablePopover`,
 * shared with the header's notification and search panels.
 */
export function DropdownMenu({
  trigger,
  items,
  align = "end",
  side = "bottom",
  label,
}: DropdownMenuProps) {
  const { open, setOpen, containerRef } = useDismissablePopover<HTMLDivElement>();
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) firstItemRef.current?.focus();
  }, [open]);

  const firstItemIndex = items.findIndex((item) => !item.divider);

  return (
    <div ref={containerRef} className="relative inline-block">
      <span className="contents" onClick={() => setOpen((value) => !value)}>
        {trigger}
      </span>
      {open ? (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "bg-surface border-border shadow-shell absolute z-40 w-56 rounded-md border p-1",
            align === "end" ? "right-0" : "left-0",
            side === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div
                  key={`divider-${index}`}
                  role="separator"
                  className="border-border-divider my-1 border-t"
                />
              );
            }
            const isFirst = index === firstItemIndex;
            return (
              <button
                key={item.label}
                ref={isFirst ? firstItemRef : undefined}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={cn(
                  "text-body-sm flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left transition-colors",
                  "focus-visible:ring-brand-800 focus-visible:ring-offset-surface focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                  item.variant === "danger"
                    ? "text-danger hover:bg-danger-100"
                    : "text-ink hover:bg-surface-alt",
                )}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
