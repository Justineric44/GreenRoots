import { Router } from 'express';
import { router as authRouter } from './auth.router.js';

export const router = Router();

// Utilisation des routers
router.use('/auth', authRouter);
