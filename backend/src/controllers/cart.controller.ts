import type { Request, Response } from 'express';
import { NotFoundError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';

export async function getActiveCart(req: Request, res: Response) {
  const userId = req.user?.userId;
  const cart = await prisma.cart.findFirst({
    where: { userId: userId!, status: 'active' },
    include: {
      items: {
        select: {
          quantity: true,
          id: true,
          tree: {
            select: {
              commonName: true,
              price: true,
              picture: true,
            },
          },
          project: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!cart) {
    throw new NotFoundError();
  }
  const cartTotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * Number(item.tree.price),
    0
  );
  console.log(cartTotal);
  res.json({ cart, cartTotal });
}
