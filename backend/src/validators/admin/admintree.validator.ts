// ============================================================
//  src/validators/admin/adminTree.validator.ts
//  Validation Zod des formulaires arbre (admin)
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
  picture: z.string().url("L'URL de l'image est invalide"),
});

export const updateTreeSchema = createTreeSchema.partial();

export type CreateTreeInput = z.infer<typeof createTreeSchema>;
export type UpdateTreeInput = z.infer<typeof updateTreeSchema>;
