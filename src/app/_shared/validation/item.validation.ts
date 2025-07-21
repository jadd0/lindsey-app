import { z } from 'zod';

export const itemValidationSchema = z.object({
  id: z.string(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
  price: z.number().nonnegative(),
  link: z.string().nonempty(),
});

export const favouriteItemsSchema = z.array(itemValidationSchema).length(3);
export type ItemValidationType = z.infer<typeof itemValidationSchema>;