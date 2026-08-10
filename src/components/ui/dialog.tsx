"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/icon-button";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Constrains the panel width; defaults to a comfortable form width. */
  className?: string;
}

/**
 * Generic modal dialog primitive — backs every modal in the app (New
 * Meeting, meeting details, cancel/delete confirmation, Upgrade). No
 * dependency added; this is a small, deliberately minimal implementation
 * (portal + focus-on-open + Escape + backdrop click + basic focus
 * containment) rather than a full focus-trap library, matching "avoid
 * unnecessary dependencies."
 *
 * Rendered via `createPortal` to `document.body` so it's never affected
 * by `AppShell`'s `overflow-hidden` shell or any ancestor stacking
 * context, present or future.
 */
export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    triggerFocusRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-ink/40 absolute inset-0" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "bg-surface shadow-shell relative flex max-h-[calc(100vh-4rem)] w-full max-w-md flex-col rounded-xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-heading text-ink">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="text-body-sm text-ink-muted">
                {description}
              </p>
            ) : null}
          </div>
          <IconButton
            icon={<X className="h-4 w-4" aria-hidden="true" />}
            aria-label="Close dialog"
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="shrink-0"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
