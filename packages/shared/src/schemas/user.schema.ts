import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Must be a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;