// ============================================================
//  middlewares/auth.middleware.ts
//  Middleware d'authentification JWT
//
//  Ce middleware protège les routes nécessitant
//  un utilisateur connecté.
//
//  Fonctionnement :
//  1. Récupère le header Authorization
//  2. Vérifie la présence du token JWT
//  3. Vérifie la validité du token
//  4. Ajoute les informations utilisateur dans req.user
//  5. Passe au middleware suivant
// ============================================================

import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../lib/errors.js';
import type { UserRole } from '@prisma/client';

// Structure attendue du payload JWT.
// Elle doit correspondre aux données signées
// dans auth.controller.ts.
type JwtPayload = {
  userId: number;
  role: UserRole;
};

export function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  // Récupération du header Authorization.
  // Format attendu :
  // Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Authorization header is missing');
  }

  // Découpe le header en deux parties :
  // ["Bearer", "<token>"]
  const [type, token] = authHeader.split(' ');

  // Vérifie le format du header.
  if (type !== 'Bearer' || !token) {
    throw new UnauthorizedError('Invalid authorization header format');
  }

  // Vérifie et décode le token JWT.
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // Ajoute les informations utilisateur
    // dans la requête Express.
    // Elles seront accessibles dans les contrôleurs
    // via req.user.
    req.user = decoded;

    next();
  } catch {
    throw new UnauthorizedError('Invalid or expired token');
  }
}
