import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../lib/errors.js';
import { updateUserBodySchema } from '../validators/user.validator.js';

// Champs renvoyés pour le profil — on exclut password.
const userSelect = {
  id: true,
  lastName: true,
  firstName: true,
  email: true,
  role: true,
  address: true,
  postalCode: true,
  city: true,
  type: true,
  siret: true,
  companyName: true,
  phone: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const userController = {
  /** GET /api/users/me — profil de l'utilisateur connecté. */
  async me(req: Request, res: Response): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundError('Utilisateur introuvable');
    }

    res.status(200).json({ data: user });
  },

  /** PUT /api/users/me — mise à jour partielle du profil. */
  async update(req: Request, res: Response): Promise<void> {
    const body = updateUserBodySchema.parse(req.body);

    // On retire les clés undefined pour respecter exactOptionalPropertyTypes.
    const data = Object.fromEntries(
      Object.entries(body).filter(([, v]) => v !== undefined)
    );
    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: data,
      select: userSelect,
    });

    res.status(200).json({ data: user });
  },

  /** DELETE /api/users/me — suppression du compte. */
  async remove(req: Request, res: Response): Promise<void> {
    await prisma.user.delete({ where: { id: req.user!.userId } });
    res.status(204).end();
  },
};
