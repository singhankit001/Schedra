import { SidebarShell } from "@/components/layout/sidebar-shell";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { SidebarUpgrade, SidebarUpgradeCompact } from "@/components/layout/sidebar-upgrade";
import { SidebarAccount } from "@/components/layout/sidebar-account";

/**
 * Fully composed *persistent* sidebar: brand mark, primary navigation, the
 * Upgrade promo, and the account footer. Rendered by `SidebarShell` from
 * `tablet` (768px) up only — see its own doc comment for the mobile
 * drawer this doesn't cover. See visual-spec/components.md → Sidebar and
 * visual-spec/spacing.md §29 for the vertical rhythm this composes: logo
 * → nav = 32px (`mt-8` on the nav), nav → Upgrade card = flexible
 * (`mt-auto` on the trailing group, pushing it to the bottom), Upgrade
 * card → account row = 16px (`gap-4` inside that group) — all unchanged
 * from `lg` (1200px) up.
 *
 * `SidebarUpgrade`/`SidebarUpgradeCompact` are swapped by breakpoint
 * (`hidden lg:flex` / `flex lg:hidden`) rather than one component
 * branching internally — the illustrated card and the icon-only trigger
 * are different enough presentations that forcing them through one
 * conditional render would be harder to read than two small, named pieces.
 */
export function Sidebar() {
  return (
    <SidebarShell>
      <SidebarLogo />
      <SidebarNavigation className="mt-8" />
      <div className="mt-auto flex flex-col gap-4">
        <div className="hidden lg:block">
          <SidebarUpgrade />
        </div>
        <div className="block lg:hidden">
          <SidebarUpgradeCompact />
        </div>
        <SidebarAccount />
      </div>
    </SidebarShell>
  );
}
