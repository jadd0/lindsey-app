import { z } from "zod";

export const messageValidationInsertSchema = z.object({
  title: z.string().nonempty(),
  email: z.string().nonempty(),
  message: z.string().nonempty(),
})