import { Eye, Link2, MoreVertical, XCircle } from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { copyMeetingLink } from "@/lib/meeting-actions";
import { useAppStore } from "@/stores/app-store";
import type { Meeting } from "@/types/meeting";

export interface MeetingActionsMenuProps {
  meeting: Meeting;
  /** `IconButton` size for the kebab trigger — rows use `sm` (24px),
   * event cards use `xs` (20px). */
  size?: "xs" | "sm";
  className?: string;
}

/**
 * Shared kebab menu for a meeting — "View details" (opens the meeting
 * details modal), "Copy meeting link" (real Clipboard API write + a
 * toast), and "Cancel meeting" (opens a confirmation dialog before any
 * state change). One implementation shared by `MeetingRow` and
 * `ScheduleItem` rather than duplicating the menu-items list per row
 * type, since both act on the same `Meeting` shape.
 */
export function MeetingActionsMenu({ meeting, size = "sm", className }: MeetingActionsMenuProps) {
  const openModal = useAppStore((state) => state.openModal);
  const showToast = useAppStore((state) => state.showToast);

  return (
    <DropdownMenu
      label={`More options for ${meeting.title}`}
      align="end"
      trigger={
        <IconButton
          icon={
            <MoreVertical
              className={size === "xs" ? "h-3.5 w-3.5" : "h-4 w-4"}
              aria-hidden="true"
            />
          }
          aria-label={`More options for ${meeting.title}`}
          size={size}
          variant="ghost"
          className={className}
        />
      }
      items={[
        {
          label: "View details",
          icon: <Eye className="h-4 w-4" aria-hidden="true" />,
          onSelect: () => openModal({ type: "meeting-details", meetingId: meeting.id }),
        },
        {
          label: "Copy meeting link",
          icon: <Link2 className="h-4 w-4" aria-hidden="true" />,
          onSelect: () => {
            void copyMeetingLink(meeting).then((ok) => {
              showToast(
                ok ? "Meeting link copied" : "Couldn't copy link — try again",
                ok ? "success" : "error",
              );
            });
          },
        },
        {
          label: "Cancel meeting",
          icon: <XCircle className="h-4 w-4" aria-hidden="true" />,
          variant: "danger",
          onSelect: () => openModal({ type: "cancel-meeting", meetingId: meeting.id }),
        },
      ]}
    />
  );
}
