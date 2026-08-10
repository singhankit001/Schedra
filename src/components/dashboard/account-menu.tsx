"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores/app-store";

export interface AccountMenuProps {
  trigger: ReactNode;
  align?: "start" | "end";
  side?: "top" | "bottom";
}

/**
 * Account dropdown shared by the header avatar and the sidebar account
 * row — same three actions either place: Profile, Account settings,
 * Sign out. No real auth exists in this app (none did before this pass
 * either), so "Sign out" doesn't pretend to end a session; it's an
 * honest, real, observable action (a toast) rather than a silently dead
 * button or a fabricated login flow.
 */
export function AccountMenu({ trigger, align = "end", side = "bottom" }: AccountMenuProps) {
  const router = useRouter();
  const showToast = useAppStore((state) => state.showToast);

  return (
    <DropdownMenu
      label="Account menu"
      align={align}
      side={side}
      trigger={trigger}
      items={[
        {
          label: "Profile",
          icon: <User className="h-4 w-4" aria-hidden="true" />,
          onSelect: () => router.push("/settings"),
        },
        {
          label: "Account settings",
          icon: <Settings className="h-4 w-4" aria-hidden="true" />,
          onSelect: () => router.push("/settings"),
        },
        { label: "", onSelect: () => {}, divider: true },
        {
          label: "Sign out",
          icon: <LogOut className="h-4 w-4" aria-hidden="true" />,
          variant: "danger",
          onSelect: () =>
            showToast("Signed out — this is a demo, no real session exists yet.", "info"),
        },
      ]}
    />
  );
}
