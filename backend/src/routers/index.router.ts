import { Router } from 'express';
import { userRouter as userRoutes } from './user.routes.js';
import { router as authRouter } from './auth.router.js';
import { router as treesRouter } from './trees.router.js';

export const router = Router();

// Utilisation des routers
router.use('/auth', authRouter);

// Compte utilisateur connecté : profil
router.use('/users', userRoutes);

router.use('/trees', treesRouter);
