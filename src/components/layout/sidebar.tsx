import { SidebarShell } from "@/components/layout/sidebar-shell";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { SidebarUpgrade } from "@/components/layout/sidebar-upgrade";
import { SidebarAccount } from "@/components/layout/sidebar-account";

/**
 * Fully composed sidebar: brand mark, primary navigation, the Upgrade
 * promo, and the account footer. See visual-spec/components.md → Sidebar
 * and visual-spec/spacing.md §29 for the vertical rhythm this composes:
 * logo → nav = 32px (`mt-8` on the nav), nav → Upgrade card = flexible
 * (`mt-auto` on the trailing group, pushing it to the bottom), Upgrade
 * card → account row = 16px (`gap-4` inside that group).
 */
export function Sidebar() {
  return (
    <SidebarShell>
      <SidebarLogo />
      <SidebarNavigation className="mt-8" />
      <div className="mt-auto flex flex-col gap-4">
        <SidebarUpgrade />
        <SidebarAccount />
      </div>
    </SidebarShell>
  );
}
