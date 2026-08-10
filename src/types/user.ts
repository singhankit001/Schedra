import { z } from "zod";

export const planSchema = z.enum(["starter", "pro", "business"]);
export type Plan = z.infer<typeof planSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  plan: planSchema,
});

export type User = z.infer<typeof userSchema>;
