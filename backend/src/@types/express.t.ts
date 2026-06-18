// ============================================================
//  src/types/express.d.ts
//  Extension du type Request d'Express
//
//  Permet d'accéder à req.user dans les contrôleurs
//  après vérification du JWT (API et admin).
// ============================================================

import type { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: UserRole;
      };
    }
  }
}
