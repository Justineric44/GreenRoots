import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { NotFoundError, ValidationError } from '../lib/errors.js';

export const orderController = {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;

    const cart = await prisma.cart.findFirst({
      where: { userId, status: 'active' },
      include: {
        items: { include: { tree: true } },
      },
    });

    if (!cart) {
      throw new NotFoundError('Aucun panier actif');
    }
    if (cart.items.length === 0) {
      throw new ValidationError('Le panier est vide');
    }

    const amount = cart.items.reduce(
      (sum, item) => sum + Number(item.tree.price) * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      // 1. Décrémenter le stock pour chaque item
      //    Si un stock devient négatif, on throw → transaction rollback
      for (const item of cart.items) {
        const updated = await tx.projectHasTree.updateMany({
          where: {
            treeId: item.treeId,
            projectId: item.projectId,
            stock: { gte: item.quantity }, // ← contrainte : stock suffisant
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        // Si aucune ligne mise à jour → stock insuffisant
        if (updated.count === 0) {
          throw new ValidationError(
            `Stock insuffisant pour "${item.tree.commonName}"`
          );
        }
      }

      // 2. Créer la commande + items
      const created = await tx.order.create({
        data: {
          userId,
          cartId: cart.id,
          amount,
          items: {
            create: cart.items.map((item) => ({
              treeId: item.treeId,
              projectId: item.projectId,
              treeCommonName: item.tree.commonName,
              quantity: item.quantity,
              unitPrice: item.tree.price,
            })),
          },
        },
        include: { items: true },
      });

      // 3. Fermer le panier
      await tx.cart.update({
        where: { id: cart.id },
        data: { status: 'converted' },
      });

      return created;
    });

    res.status(201).json({ data: order });
  },
};
