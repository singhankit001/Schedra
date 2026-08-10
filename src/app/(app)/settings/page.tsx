"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/dashboard/page-header";
import { mockAccount } from "@/data/mock-account";
import { useAppStore } from "@/stores/app-store";

/** Profile + notification-preference settings — real local state (the
 * form fields are controlled and editable), "Save" produces a genuine
 * toast rather than a silent no-op. No backend exists to persist this
 * past the session, consistent with the rest of the app's data layer. */
export default function SettingsPage() {
  const [name, setName] = useState(mockAccount.name);
  const [email, setEmail] = useState(mockAccount.email);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const showToast = useAppStore((state) => state.showToast);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Manage your profile and preferences." />

      <Card className="flex flex-col gap-4">
        <p className="text-label text-ink-muted">Profile</p>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Card>

      <Card className="flex flex-col gap-3">
        <p className="text-label text-ink-muted">Notifications</p>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
            className="accent-brand-800 h-4 w-4"
          />
          <span className="text-body-sm text-ink">Email me when a meeting is booked</span>
        </label>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => showToast("Settings saved", "success")}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
