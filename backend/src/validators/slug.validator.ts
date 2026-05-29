import { z } from 'zod';

const slugSchema = z.string().min(1, 'Slug manquant ou invalide');

export function parseSlugFromParams(slug: unknown): string {
  return slugSchema.parse(slug);
}
