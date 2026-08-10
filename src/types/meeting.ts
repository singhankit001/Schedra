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
});

export type Meeting = z.infer<typeof meetingSchema>;
