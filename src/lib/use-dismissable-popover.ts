"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared open/outside-click/Escape behavior for any popover-style UI
 * (dropdown menus, the notification panel, the search results panel) —
 * extracted so each one doesn't re-implement the same listener pair.
 * Returns a container ref: attach it to the element that wraps both the
 * trigger and the panel so outside-click detection has the right bounds.
 */
export function useDismissablePopover<T extends HTMLElement = HTMLDivElement>(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return { open, setOpen, containerRef };
}
