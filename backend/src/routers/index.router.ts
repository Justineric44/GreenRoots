import { Router } from 'express';
import { router as authRouter } from './auth.router';

export const router = Router();

// Utilisation des routers
router.use('/api/auth', authRouter);
