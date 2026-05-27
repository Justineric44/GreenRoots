import { Router } from 'express';

//Imports des controllers et middlewares

//Instanciation du router
export const router = Router();

//Définition des routes d'authentification

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser);
