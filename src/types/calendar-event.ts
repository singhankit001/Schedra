import { z } from "zod";

export const calendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  hasReminder: z.boolean().default(false),
});

export type CalendarEvent = z.infer<typeof calendarEventSchema>;
