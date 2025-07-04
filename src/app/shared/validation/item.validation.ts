import { z } from 'zod';

export const itemValidationSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
  price: z.number().nonnegative(),
  link: z.string().nonempty(),
});



export type ItemValidationType = z.infer<typeof itemValidationSchema>;