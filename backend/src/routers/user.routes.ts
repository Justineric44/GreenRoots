import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

// Toutes les routes /users/me nécessitent un JWT valide.
userRouter.use(authenticateToken);
// GET    /api/users/me              -> profil
// PUT    /api/users/me              -> mise à jour partielle
// DELETE /api/users/me              -> suppression du compte (RGPD)
userRouter.get('/me', userController.me);
userRouter.put('/me', userController.update);
userRouter.delete('/me', userController.remove);

// GET    /api/users/me/orders       -> liste des commandes
// GET    /api/users/me/orders/:id   -> détail d'une commande
userRouter.get('/me/orders', userController.listOrders);
userRouter.get('/me/orders/:id', userController.getOrder);
