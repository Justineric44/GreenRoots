import { Router } from 'express';
import { router as authRouter } from './auth.router.js';
import { router as projectRouter } from './project.router.js';
import { userRouter as userRoutes } from './user.routes.js';
import { router as treesRouter } from './trees.router.js';
import { router as cartRouter } from './cart.router.js';

export const router = Router();

// Utilisation des routers
router.use('/auth', authRouter);
router.use('/projects', projectRouter);

// Compte utilisateur connecté : profil
router.use('/users', userRoutes);

router.use('/trees', treesRouter);

router.use('/carts', cartRouter);
