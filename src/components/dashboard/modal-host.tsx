"use client";

import { NewMeetingModal } from "@/components/dashboard/new-meeting-modal";
import { MeetingDetailsModal } from "@/components/dashboard/meeting-details-modal";
import { CancelMeetingDialog } from "@/components/dashboard/cancel-meeting-dialog";
import { UpgradeModal } from "@/components/dashboard/upgrade-modal";
import {
  EditMeetingTypeModal,
  DeleteMeetingTypeModal,
} from "@/components/dashboard/meeting-type-modals";

/**
 * Mounts every modal once, at the app layout level. Each modal reads
 * `useAppStore().modal` itself and renders `null` unless it's the active
 * one — a single source of truth for "which modal (if any) is open"
 * instead of each page/component owning its own open/closed state.
 */
export function ModalHost() {
  return (
    <>
      <NewMeetingModal />
      <MeetingDetailsModal />
      <CancelMeetingDialog />
      <UpgradeModal />
      <EditMeetingTypeModal />
      <DeleteMeetingTypeModal />
    </>
  );
}
