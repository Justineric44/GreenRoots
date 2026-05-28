import { Router } from 'express';
import { router as authRouter } from './auth.router.js';
import { router as treesRouter } from './trees.router.js';

export const router = Router();

// Utilisation des routers
router.use('/api/auth', authRouter);
router.use(treesRouter);
