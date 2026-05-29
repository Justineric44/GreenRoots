import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

export const userRouter = Router();

// Toutes les routes /users/me nécessitent un JWT valide.
userRouter.use(authenticateToken);

userRouter.get('/me', userController.me);
userRouter.put('/me', userController.update);
userRouter.delete('/me', userController.remove);
