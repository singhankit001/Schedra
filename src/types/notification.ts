import { z } from "zod";

export const notificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
  read: z.boolean().default(false),
});

export type Notification = z.infer<typeof notificationSchema>;
