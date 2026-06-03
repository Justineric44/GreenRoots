// ============================================================
//  src/controllers/admin/adminAuth.controller.ts
//  Gestion de l'authentification admin
//
//  Fonctions :
//  - getLogin  : affiche le formulaire de connexion
//  - postLogin : vérifie les credentials, pose le cookie JWT
//  - postLogout: supprime le cookie et redirige vers login
// ============================================================

import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { prisma } from '../../lib/prisma.js';

// ---- GET /admin/login ----
export async function getLogin(req: Request, res: Response): Promise<void> {
  // Si déjà connecté en tant qu'admin, redirige directement
  const token = req.cookies?.admin_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        role: string;
      };
      if (decoded.role === 'admin') {
        res.redirect('/admin/dashboard');
        return;
      }
    } catch {
      // Token invalide → on affiche quand même le login
      res.clearCookie('admin_token');
    }
  }

  res.render('admin/login', { query: req.query });
}

// ---- POST /admin/login ----
export async function postLogin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body; // Validation basique des champs

  if (!email || !password) {
    res.redirect('/admin/login?error=Email+et+mot+de+passe+requis');
    return;
  }

  try {
    // Recherche de l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email },
    }); // Utilisateur inexistant ou pas admin

    if (!user || user.role !== 'admin') {
      res.redirect('/admin/login?error=Identifiants+incorrects');
      return;
    } // Vérification du mot de passe avec argon2

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.redirect('/admin/login?error=Identifiants+incorrects');
      return;
    } // Vérification JWT_SECRET

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    } // Génération du JWT

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    ); // Pose du cookie httpOnly

    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8h en ms
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('[adminAuth] postLogin error:', error);
    res.redirect('/admin/login?error=Erreur+serveur');
  }
}

// ---- POST /admin/logout ----
export function postLogout(_req: Request, res: Response): void {
  res.clearCookie('admin_token');
  res.redirect('/admin/login');
}
