import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  company: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
