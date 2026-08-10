import { z } from "zod";

export const meetingFormatSchema = z.enum(["one-on-one", "group"]);
export type MeetingFormat = z.infer<typeof meetingFormatSchema>;

export const meetingTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  durationMinutes: z.number().positive(),
  format: meetingFormatSchema,
  bookingUrl: z.string().url().optional(),
});

export type MeetingType = z.infer<typeof meetingTypeSchema>;
