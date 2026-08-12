"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SchedraLogo } from "@/components/branding/schedra-logo";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { SidebarUpgrade } from "@/components/layout/sidebar-upgrade";
import { SidebarAccount } from "@/components/layout/sidebar-account";
import { IconButton } from "@/components/ui/icon-button";
import { useUIStore } from "@/stores/ui-store";

/**
 * Off-canvas navigation for mobile (<768px) — the counterpart to the
 * persistent `SidebarShell`, which doesn't render at all below `tablet`.
 * Opened by the header hamburger, backed by `useUIStore().isSidebarOpen`
 * (foundational state that predates this component — see the store's own
 * doc comment — wired up here for the first time).
 *
 * Not a squeezed copy of the desktop sidebar: full labels always on
 * (`railCollapse={false}` — this is a single mobile-only instance, never
 * resized into a rail), full-width promo card, slide-in panel over a
 * backdrop rather than a persistent column, since there's no spare width
 * to dedicate to navigation chrome on a phone.
 *
 * Deliberately mirrors `Dialog`'s own minimal-implementation choices
 * (portal + focus-on-open + Tab loop + Escape + backdrop click + body
 * scroll lock) rather than pulling in a focus-trap dependency — same
 * reasoning, smaller surface (one open/close boolean, no variants).
 * Additionally closes on route change, since navigating *is* the
 * drawer's own primary action.
 */
export function MobileSidebarDrawer() {
  const isOpen = useUIStore((state) => state.isSidebarOpen);
  const closeSidebar = useUIStore((state) => state.closeSidebar);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  const previousPathnameRef = useRef(pathname);

  // Close on navigation — the drawer's links are the point of opening it.
  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      closeSidebar();
    }
  }, [pathname, closeSidebar]);

  useEffect(() => {
    if (!isOpen) return;

    triggerFocusRef.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusable = panel?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSidebar();
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
  }, [isOpen, closeSidebar]);

  if (!isOpen) return null;

  return createPortal(
    <div className="tablet:hidden fixed inset-0 z-50">
      <div className="bg-ink/40 absolute inset-0" aria-hidden="true" onClick={closeSidebar} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="bg-app shadow-shell relative flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto p-6"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            aria-label="Schedra — go to dashboard"
            className="focus-visible:ring-brand-800 focus-visible:ring-offset-app inline-flex rounded-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <SchedraLogo />
          </Link>
          <IconButton
            icon={<X className="h-4 w-4" aria-hidden="true" />}
            aria-label="Close navigation"
            size="sm"
            variant="ghost"
            onClick={closeSidebar}
          />
        </div>

        <SidebarNavigation className="mt-8" railCollapse={false} />

        <div className="mt-auto flex flex-col gap-4 pt-6">
          <SidebarUpgrade />
          <SidebarAccount railCollapse={false} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
