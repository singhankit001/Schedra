import Link from "next/link";
import { SchedraLogo } from "@/components/branding/schedra-logo";

/**
 * Sidebar-specific usage of the brand lockup: wraps it in a link back to
 * the dashboard with its own accessible name. Focus ring uses the same
 * light-surface convention as the rest of the app (`ring-brand-800`/
 * `ring-offset-app`) now that the sidebar itself is a light surface, not
 * the dark-on-dark treatment this needed before the sidebar color
 * correction.
 */
export function SidebarLogo() {
  return (
    <Link
      href="/dashboard"
      aria-label="Schedra — go to dashboard"
      className="focus-visible:ring-brand-800 focus-visible:ring-offset-app inline-flex rounded-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <SchedraLogo />
    </Link>
  );
}
