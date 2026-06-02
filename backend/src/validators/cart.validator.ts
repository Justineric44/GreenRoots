import { z } from 'zod';

export const addCartItemsSchema = z.object({
  treeId: z.number().int().positive(),
  projectId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export type CartBody = z.infer<typeof addCartItemsSchema>;
