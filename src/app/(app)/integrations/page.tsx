"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { MeetingPlatformIcon, PROVIDER_LABEL } from "@/components/dashboard/meeting-platform-icon";
import { useAppStore } from "@/stores/app-store";
import type { MeetingProvider } from "@/types/meeting";

const INTEGRATIONS: { id: MeetingProvider; description: string }[] = [
  { id: "google-meet", description: "Create Google Meet links automatically for new meetings." },
  { id: "zoom", description: "Create Zoom meetings automatically for new meetings." },
  { id: "microsoft-teams", description: "Create Microsoft Teams meetings automatically." },
];

/**
 * Connect/disconnect toggles for the three meeting platforms — real
 * local state (persists for the session, same as everything else in
 * this mock-data app), each toggle producing a toast so the action is
 * observable, not a silent no-op.
 */
export default function IntegrationsPage() {
  const [connected, setConnected] = useState<Record<MeetingProvider, boolean>>({
    "google-meet": true,
    zoom: false,
    "microsoft-teams": false,
  });
  const showToast = useAppStore((state) => state.showToast);

  function toggle(id: MeetingProvider) {
    setConnected((prev) => {
      const next = !prev[id];
      showToast(`${PROVIDER_LABEL[id]} ${next ? "connected" : "disconnected"}`, "success");
      return { ...prev, [id]: next };
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Integrations"
        description="Connect the video platforms you schedule meetings on."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {INTEGRATIONS.map((integration) => (
          <Card key={integration.id} className="flex flex-col gap-4">
            <MeetingPlatformIcon provider={integration.id} size={32} />
            <div className="flex flex-col gap-1">
              <p className="text-body text-ink font-semibold">{PROVIDER_LABEL[integration.id]}</p>
              <p className="text-body-sm text-ink-muted">{integration.description}</p>
            </div>
            <Button
              variant={connected[integration.id] ? "secondary" : "primary"}
              onClick={() => toggle(integration.id)}
            >
              {connected[integration.id] ? "Disconnect" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
