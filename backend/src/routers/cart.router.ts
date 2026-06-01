import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import * as cartController from '../controllers/cart.controller.js';

export const router = Router();

router.get('/', authenticateToken, cartController.getActiveCart);
router.post('/items', authenticateToken, cartController.addItemToCart);
