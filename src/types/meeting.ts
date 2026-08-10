import { z } from "zod";
import { contactSchema } from "./contact";

export const meetingProviderSchema = z.enum(["google-meet", "zoom", "microsoft-teams"]);
export type MeetingProvider = z.infer<typeof meetingProviderSchema>;

export const meetingStatusSchema = z.enum(["scheduled", "in-progress", "completed", "cancelled"]);
export type MeetingStatus = z.infer<typeof meetingStatusSchema>;

export const meetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  provider: meetingProviderSchema,
  status: meetingStatusSchema,
  joinUrl: z.string().url().optional(),
  attendees: z.array(contactSchema),
  /** Free-text notes captured on creation — added for the New Meeting
   * form; optional so every existing mock meeting stays valid without
   * modification. */
  notes: z.string().optional(),
});

export type Meeting = z.infer<typeof meetingSchema>;
