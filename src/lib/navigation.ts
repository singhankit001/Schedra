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
  /** Whether `href` currently resolves to a real page. Every item is now
   * `true` — all 11 routes have real pages. Kept as a field (rather than
   * removed) since `SidebarNavItem` still reads it to decide whether to
   * prefetch, and a future route added here before its page exists would
   * want the same "don't prefetch a 404" protection this always gave. */
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
  { id: "meetings", label: "Meetings", href: "/meetings", icon: Video, implemented: true },
  { id: "calendar", label: "Calendar", href: "/calendar", icon: CalendarDays, implemented: true },
  {
    id: "availability",
    label: "Availability",
    href: "/availability",
    icon: Clock,
    implemented: true,
  },
  {
    id: "meeting-types",
    label: "Meeting Types",
    href: "/meeting-types",
    icon: LayoutList,
    implemented: true,
  },
  { id: "contacts", label: "Contacts", href: "/contacts", icon: Contact, implemented: true },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: BarChart3, implemented: true },
  {
    id: "integrations",
    label: "Integrations",
    href: "/integrations",
    icon: Puzzle,
    implemented: true,
  },
  { id: "team", label: "Team", href: "/team", icon: Users, implemented: true },
  { id: "billing", label: "Billing", href: "/billing", icon: CreditCard, implemented: true },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings, implemented: true },
];
