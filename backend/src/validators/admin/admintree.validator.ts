// ============================================================
//  src/validators/admin/adminTree.validator.ts
// ============================================================

import { z } from 'zod';

export const createTreeSchema = z.object({
  commonName: z.string().min(1, 'Le nom commun est requis'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .regex(
      /^[a-z0-9-]+$/,
      'Le slug ne peut contenir que des minuscules, chiffres et tirets'
    ),
  scientificName: z.string().min(1, 'Le nom scientifique est requis'),
  family: z.string().min(1, 'La famille est requise'),
  shortDescription: z.string().min(1, 'La description courte est requise'),
  longDescription: z.string().optional(),
  origin: z.string().optional(),
  price: z.coerce.number().positive('Le prix doit être supérieur à 0'),
  picture: z.string().min(1, "L'image est requise"),
});

export const treeProjectsSchema = z.object({
  projectIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    }),
  stocks: z.record(z.string(), z.coerce.number().min(0)).optional().default({}),
});

export const updateTreeSchema = createTreeSchema.partial();

export type CreateTreeInput = z.infer<typeof createTreeSchema>;
export type UpdateTreeInput = z.infer<typeof updateTreeSchema>;
export type TreeProjectsInput = z.infer<typeof treeProjectsSchema>;
