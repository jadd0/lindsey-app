import { z } from "zod";

export const messageValidationInsertSchema = z.object({
  title: z.string().nonempty(),
  email: z.string().email({ message: "Invalid email address"}).nonempty(),
  message: z.string().nonempty(),
})