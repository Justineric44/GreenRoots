import { Router } from 'express';
import type { Request, Response } from 'express';
import { router as authRouter } from './auth.router.js';
import { router as projectRouter } from './project.router.js';
import { router as userRouter } from './user.router.js';
import { router as treesRouter } from './trees.router.js';
import { router as cartRouter } from './cart.router.js';
import { router as orderRouter } from './order.router.js';
import { sseManager } from '../lib/sseManager.js';

export const router = Router();

// Utilisation des routers
router.use('/auth', authRouter);
router.use('/projects', projectRouter);

// Compte utilisateur connecté : profil
router.use('/users', userRouter);

router.use('/trees', treesRouter);

router.use('/carts', cartRouter);

router.use('/orders', orderRouter);

// SSE — Mise à jour stocks en temps réel
router.get('/sse', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseManager.addClient(res);

  req.on('close', () => sseManager.removeClient(res));
});
