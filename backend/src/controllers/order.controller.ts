import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { createOrderFromActiveCart } from '../services/order.service.js';

export const orderController = {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;

    const order = await prisma.$transaction((tx) =>
      createOrderFromActiveCart(tx, userId)
    );

    res.status(201).json({ data: order });
  },
};
