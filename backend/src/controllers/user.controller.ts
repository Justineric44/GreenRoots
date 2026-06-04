import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../lib/errors.js';
import {
  updateUserBodySchema,
  orderIdParamSchema,
} from '../validators/user.validator.js';

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

  /**
   * DELETE /api/users/me — suppression du compte (soft-delete + anonymisation).
   *
   * On ne fait pas un vrai DELETE : les commandes du user doivent rester
   * en base (traçabilité comptable + onDelete: Restrict sur Order.user).
   * À la place, on anonymise les données perso et on marque deletedAt.
   * L'auth.controller refusera ensuite tout login sur ce compte.
   */
  async remove(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;

    await prisma.user.update({
      where: { id: userId },
      data: {
        email: `deleted-${userId}@anonymized.local`,
        lastName: 'Anonyme',
        firstName: 'Utilisateur',
        address: '',
        postalCode: '',
        city: '',
        phone: null,
        siret: null,
        companyName: null,
        password: '',
        deletedAt: new Date(),
      },
    });

    res.status(204).end();
  },

  /** GET /api/users/me/orders — historique des commandes. */
  async listOrders(req: Request, res: Response): Promise<void> {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            project: { select: { name: true, slug: true } },
          },
        },
      },
    });

    res.status(200).json({ data: orders });
  },

  /** GET /api/users/me/orders/:id — détail d'une commande. */
  async getOrder(req: Request, res: Response): Promise<void> {
    const { id } = orderIdParamSchema.parse(req.params);

    const order = await prisma.order.findFirst({
      where: { id, userId: req.user!.userId },
      include: {
        items: {
          include: {
            project: { select: { name: true, slug: true } },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundError('Commande introuvable');
    }

    res.status(200).json({ data: order });
  },
};
