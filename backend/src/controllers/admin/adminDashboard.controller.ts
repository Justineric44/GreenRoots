// ============================================================
//  src/controllers/admin/adminDashboard.controller.ts
//  Contrôleur principal du dashboard admin
//
//  Fonctions :
//  - getDashboard      : charge toutes les données en une fois
//  - postCreateProject : crée un projet
//  - postUpdateProject : modifie un projet
//  - postDeleteProject : supprime un projet
//  - postCreateTree    : crée un arbre
//  - postUpdateTree    : modifie un arbre
//  - postDeleteTree    : supprime un arbre
//  - postDeleteUser    : supprime un utilisateur
// ============================================================

import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../../validators/admin/adminProject.validator.js';
import {
  createTreeSchema,
  updateTreeSchema,
} from '../../validators/admin/adminTree.validator.js';
import { deleteUserSchema } from '../../validators/admin/adminUser.validator.js';

// ============================================================
// GET /admin/dashboard
// ============================================================

export async function getDashboard(req: Request, res: Response): Promise<void> {
  try {
    // Charge toutes les données en parallèle
    const [projects, trees, orders, users] = await Promise.all([
      prisma.project.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.tree.findMany({
        orderBy: { commonName: 'asc' },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          items: true,
        },
      }),
      prisma.user.findMany({
        orderBy: { lastName: 'asc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          type: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    res.render('admin/dashboard', {
      projects,
      trees,
      orders,
      users,
      query: req.query,
    });
  } catch (error) {
    console.error('[adminDashboard] getDashboard error:', error);
    res.redirect(
      '/admin/dashboard?error=Erreur+lors+du+chargement+des+donn%C3%A9es'
    );
  }
}

// ============================================================
// POST /admin/projects — Créer un projet
// ============================================================

export async function postCreateProject(
  req: Request,
  res: Response
): Promise<void> {
  const result = createProjectSchema.safeParse(req.body);

  if (!result.success) {
    const message = encodeURIComponent(result.error.errors[0].message);
    res.redirect(`/admin/dashboard?section=projects&error=${message}`);
    return;
  }

  try {
    await prisma.project.create({ data: result.data });
    res.redirect(
      '/admin/dashboard?section=projects&success=Projet+cr%C3%A9%C3%A9+avec+succ%C3%A8s'
    );
  } catch (error: unknown) {
    console.error('[adminDashboard] postCreateProject error:', error);
    // Gestion du slug dupliqué (contrainte unique Prisma)
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      res.redirect(
        '/admin/dashboard?section=projects&error=Ce+slug+existe+d%C3%A9j%C3%A0'
      );
      return;
    }
    res.redirect(
      '/admin/dashboard?section=projects&error=Erreur+lors+de+la+cr%C3%A9ation'
    );
  }
}

// ============================================================
// POST /admin/projects/:id — Modifier un projet
// ============================================================

export async function postUpdateProject(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.redirect(
      '/admin/dashboard?section=projects&error=Identifiant+invalide'
    );
    return;
  }

  const result = updateProjectSchema.safeParse(req.body);

  if (!result.success) {
    const message = encodeURIComponent(result.error.errors[0].message);
    res.redirect(`/admin/dashboard?section=projects&error=${message}`);
    return;
  }

  try {
    await prisma.project.update({
      where: { id },
      data: result.data,
    });
    res.redirect(
      '/admin/dashboard?section=projects&success=Projet+mis+%C3%A0+jour'
    );
  } catch (error: unknown) {
    console.error('[adminDashboard] postUpdateProject error:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      res.redirect(
        '/admin/dashboard?section=projects&error=Projet+introuvable'
      );
      return;
    }
    res.redirect(
      '/admin/dashboard?section=projects&error=Erreur+lors+de+la+mise+%C3%A0+jour'
    );
  }
}

// ============================================================
// POST /admin/projects/:id/delete — Supprimer un projet
// ============================================================

export async function postDeleteProject(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.redirect(
      '/admin/dashboard?section=projects&error=Identifiant+invalide'
    );
    return;
  }

  try {
    await prisma.project.delete({ where: { id } });
    res.redirect(
      '/admin/dashboard?section=projects&success=Projet+supprim%C3%A9'
    );
  } catch (error: unknown) {
    console.error('[adminDashboard] postDeleteProject error:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      res.redirect(
        '/admin/dashboard?section=projects&error=Projet+introuvable'
      );
      return;
    }
    res.redirect(
      '/admin/dashboard?section=projects&error=Erreur+lors+de+la+suppression'
    );
  }
}

// ============================================================
// POST /admin/trees — Créer un arbre
// ============================================================

export async function postCreateTree(
  req: Request,
  res: Response
): Promise<void> {
  const result = createTreeSchema.safeParse(req.body);

  if (!result.success) {
    const message = encodeURIComponent(result.error.errors[0].message);
    res.redirect(`/admin/dashboard?section=trees&error=${message}`);
    return;
  }

  try {
    await prisma.tree.create({ data: result.data });
    res.redirect(
      '/admin/dashboard?section=trees&success=Arbre+cr%C3%A9%C3%A9+avec+succ%C3%A8s'
    );
  } catch (error: unknown) {
    console.error('[adminDashboard] postCreateTree error:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      res.redirect(
        '/admin/dashboard?section=trees&error=Ce+slug+existe+d%C3%A9j%C3%A0'
      );
      return;
    }
    res.redirect(
      '/admin/dashboard?section=trees&error=Erreur+lors+de+la+cr%C3%A9ation'
    );
  }
}

// ============================================================
// POST /admin/trees/:id — Modifier un arbre
// ============================================================

export async function postUpdateTree(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.redirect('/admin/dashboard?section=trees&error=Identifiant+invalide');
    return;
  }

  const result = updateTreeSchema.safeParse(req.body);

  if (!result.success) {
    const message = encodeURIComponent(result.error.errors[0].message);
    res.redirect(`/admin/dashboard?section=trees&error=${message}`);
    return;
  }

  try {
    await prisma.tree.update({
      where: { id },
      data: result.data,
    });
    res.redirect(
      '/admin/dashboard?section=trees&success=Arbre+mis+%C3%A0+jour'
    );
  } catch (error: unknown) {
    console.error('[adminDashboard] postUpdateTree error:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      res.redirect('/admin/dashboard?section=trees&error=Arbre+introuvable');
      return;
    }
    res.redirect(
      '/admin/dashboard?section=trees&error=Erreur+lors+de+la+mise+%C3%A0+jour'
    );
  }
}

// ============================================================
// POST /admin/trees/:id/delete — Supprimer un arbre
// ============================================================

export async function postDeleteTree(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.redirect('/admin/dashboard?section=trees&error=Identifiant+invalide');
    return;
  }

  try {
    await prisma.tree.delete({ where: { id } });
    res.redirect('/admin/dashboard?section=trees&success=Arbre+supprim%C3%A9');
  } catch (error: unknown) {
    console.error('[adminDashboard] postDeleteTree error:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      res.redirect(
        '/admin/dashboard?section=trees&error=Impossible+de+supprimer+cet+arbre+%28utilis%C3%A9+dans+des+commandes%29'
      );
      return;
    }
    res.redirect(
      '/admin/dashboard?section=trees&error=Erreur+lors+de+la+suppression'
    );
  }
}

// ============================================================
// POST /admin/users/:id/delete — Supprimer un utilisateur
// ============================================================

export async function postDeleteUser(
  req: Request,
  res: Response
): Promise<void> {
  const result = deleteUserSchema.safeParse({ id: req.params.id });

  if (!result.success) {
    res.redirect('/admin/dashboard?section=users&error=Identifiant+invalide');
    return;
  }

  const { id } = result.data;

  try {
    // Sécurité : on ne peut pas supprimer un admin
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      res.redirect(
        '/admin/dashboard?section=users&error=Utilisateur+introuvable'
      );
      return;
    }

    if (user.role === 'admin') {
      res.redirect(
        '/admin/dashboard?section=users&error=Impossible+de+supprimer+un+administrateur'
      );
      return;
    }

    await prisma.user.delete({ where: { id } });
    res.redirect(
      '/admin/dashboard?section=users&success=Utilisateur+supprim%C3%A9'
    );
  } catch (error) {
    console.error('[adminDashboard] postDeleteUser error:', error);
    res.redirect(
      '/admin/dashboard?section=users&error=Erreur+lors+de+la+suppression'
    );
  }
}
