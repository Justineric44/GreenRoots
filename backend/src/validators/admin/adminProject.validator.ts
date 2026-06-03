// ============================================================
//  src/validators/admin/adminProject.validator.ts
//  Validation Zod des formulaires projet (admin)
// ============================================================

import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .regex(
      /^[a-z0-9-]+$/,
      'Le slug ne peut contenir que des minuscules, chiffres et tirets'
    ),
  shortDescription: z.string().min(1, 'La description courte est requise'),
  longDescription: z.string().optional(),
  localisation: z.string().min(1, 'La localisation est requise'),
  picture: z.string().min(1, "L'URL de l'image est requise"),
  progress: z.coerce.number().int().min(0).max(100),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
