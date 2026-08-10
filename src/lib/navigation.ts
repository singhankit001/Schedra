import {
  BarChart3,
  CalendarDays,
  Clock,
  Contact,
  CreditCard,
  LayoutDashboard,
  LayoutList,
  Puzzle,
  Settings,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Whether `href` currently resolves to a real page. Only `/dashboard`
   * exists so far (Phase 1/3 scope) — the rest are real links ready for
   * later phases to fill in, but Next.js prefetches every in-viewport
   * `<Link>` by default, and prefetching a route with no page 404s in the
   * console. `SidebarNavItem` disables prefetch for anything not yet
   * implemented so the sidebar stays console-clean without having to stub
   * out ten placeholder pages this phase. */
  implemented?: boolean;
}

/**
 * Primary sidebar navigation, in reference order (components.md →
 * Sidebar → Nav item enumerates these 11 labels — the section's own "×10"
 * count is off by one against its own list; the list itself is what was
 * followed here).
 *
 * Icon choices are semantic best-fits: components.md specifies each nav
 * item's icon slot (20×20px) but not which glyph it is, so these are
 * reasonable inference, not sampled from the reference at pixel level.
 */
export const NAV_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    implemented: true,
  },
  { id: "meetings", label: "Meetings", href: "/meetings", icon: Video },
  { id: "calendar", label: "Calendar", href: "/calendar", icon: CalendarDays },
  { id: "availability", label: "Availability", href: "/availability", icon: Clock },
  { id: "meeting-types", label: "Meeting Types", href: "/meeting-types", icon: LayoutList },
  { id: "contacts", label: "Contacts", href: "/contacts", icon: Contact },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChart3 },
  { id: "integrations", label: "Integrations", href: "/integrations", icon: Puzzle },
  { id: "team", label: "Team", href: "/team", icon: Users },
  { id: "billing", label: "Billing", href: "/billing", icon: CreditCard },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];
