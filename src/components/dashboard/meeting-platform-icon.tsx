import { cn } from "@/lib/utils";
import type { MeetingProvider } from "@/types/meeting";

export interface MeetingPlatformIconProps {
  provider: MeetingProvider;
  size?: number;
  className?: string;
}

/**
 * Recognizable-but-original platform marks for Google Meet / Zoom /
 * Microsoft Teams — deliberately NOT the real trademarked logos.
 * Each one borrows only its platform's characteristic color identity
 * (Meet's four-color block, Zoom's blue, Teams' purple) on a generic
 * camera/video glyph, the same "deterministic local SVG, not a real
 * brand asset" approach already used for `MeetPlanMark` and
 * `UpgradeIllustration`. Replaces the flat single-color `Video` Lucide
 * icon `PROVIDER_STYLES` used previously — see DESIGN_SYSTEM.md.
 */
export function MeetingPlatformIcon({ provider, size = 24, className }: MeetingPlatformIconProps) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", className: cn(className) };

  if (provider === "google-meet") {
    return (
      <svg {...props} aria-hidden="true">
        <rect
          x="2"
          y="5"
          width="14"
          height="14"
          rx="3"
          fill="#F8F5EF"
          stroke="#1B1F1C"
          strokeWidth="0.5"
        />
        <path d="M2 8h14v3H2z" fill="#34A853" />
        <path d="M2 11h14v3H2z" fill="#4285F4" />
        <path d="M9 5h7v4H9z" fill="#FBBC05" />
        <path d="M9 15h7v4H9z" fill="#EA4335" />
        <path d="M16 10.5 22 7v10l-6-3.5Z" fill="#1B1F1C" />
      </svg>
    );
  }

  if (provider === "zoom") {
    return (
      <svg {...props} aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="5" fill="#2D8CFF" />
        <rect x="4.5" y="9" width="10" height="6" rx="1.5" fill="white" />
        <path d="M16 10.8 20.5 8v8L16 13.2Z" fill="white" />
      </svg>
    );
  }

  // microsoft-teams
  return (
    <svg {...props} aria-hidden="true">
      <rect x="1" y="2" width="22" height="20" rx="5" fill="#5B5FC7" />
      <circle cx="15.5" cy="8" r="2.4" fill="white" />
      <path
        d="M11.5 11.2h7.4c.9 0 1.6.7 1.6 1.6v3.1c0 1.9-1.5 3.4-3.4 3.4h-1.2c-1.9 0-3.4-1.5-3.4-3.4v-2.7Z"
        fill="white"
      />
      <circle cx="8.7" cy="8.6" r="2" fill="white" fillOpacity="0.85" />
      <path
        d="M5.2 11.6h6.6v3.2c0 1.6-1.3 2.9-2.9 2.9h-.8c-1.6 0-2.9-1.3-2.9-2.9v-3.2Z"
        fill="white"
        fillOpacity="0.85"
      />
    </svg>
  );
}

export const PROVIDER_LABEL: Record<MeetingProvider, string> = {
  "google-meet": "Google Meet",
  zoom: "Zoom",
  "microsoft-teams": "Microsoft Teams",
};
