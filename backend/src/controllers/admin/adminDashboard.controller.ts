// ============================================================
// src/controllers/admin/adminDashboard.controller.ts
// ============================================================

import type { Request, Response } from 'express';
import type { ZodError } from 'zod';

import { prisma } from '../../lib/prisma.js';

import {
  createProjectSchema,
  updateProjectSchema,
} from '../../validators/admin/adminproject.validator.js';

import {
  createTreeSchema,
  updateTreeSchema,
  treeProjectsSchema,
} from '../../validators/admin/admintree.validator.js';

import { deleteUserSchema } from '../../validators/admin/adminuser.validator.js';
import { UPLOADS_BASE_URL } from '../../middlewares/upload.middleware.js';

// ============================================================
// Helpers
// ============================================================

function redirectValidationError(
  res: Response,
  section: string,
  error: ZodError
): void {
  const message = encodeURIComponent(
    error.issues[0]?.message ?? 'Données invalides'
  );
  res.redirect(`/admin/dashboard?section=${section}&error=${message}`);
}

function hasPrismaCode(error: unknown, code: string): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: string }).code === code
  );
}

// Construit l'URL publique de l'image uploadée
// Si un fichier a été uploadé → /uploads/filename
// Sinon → garde la valeur existante du body (pour les updates sans nouvelle image)
function resolvePicture(req: Request): string | undefined {
  if (req.file) {
    return `${UPLOADS_BASE_URL}/uploads/${req.file.filename}`;
  }
  return req.body.picture || undefined;
}

// ============================================================
// GET /admin/dashboard
// ============================================================

export async function getDashboard(req: Request, res: Response): Promise<void> {
  try {
    const [projects, trees, orders, users] = await Promise.all([
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
      }),

      prisma.tree.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          projects: {
            include: {
              project: {
                select: { id: true, name: true, slug: true },
              },
            },
          },
        },
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
        orderBy: { createdAt: 'desc' },
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
  const body = { ...req.body, picture: resolvePicture(req) };
  const result = createProjectSchema.safeParse(body);

  if (!result.success) {
    redirectValidationError(res, 'projects', result.error);
    return;
  }

  try {
    await prisma.project.create({ data: result.data });
    res.redirect(
      '/admin/dashboard?section=projects&success=Projet+cr%C3%A9%C3%A9+avec+succ%C3%A8s'
    );
  } catch (error) {
    console.error('[adminDashboard] postCreateProject error:', error);
    if (hasPrismaCode(error, 'P2002')) {
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

  if (Number.isNaN(id)) {
    res.redirect(
      '/admin/dashboard?section=projects&error=Identifiant+invalide'
    );
    return;
  }

  const body = { ...req.body, picture: resolvePicture(req) };
  const result = updateProjectSchema.safeParse(body);

  if (!result.success) {
    redirectValidationError(res, 'projects', result.error);
    return;
  }

  try {
    await prisma.project.update({ where: { id }, data: result.data });
    res.redirect(
      '/admin/dashboard?section=projects&success=Projet+mis+%C3%A0+jour'
    );
  } catch (error) {
    console.error('[adminDashboard] postUpdateProject error:', error);
    if (hasPrismaCode(error, 'P2025')) {
      res.redirect(
        '/admin/dashboard?section=projects&error=Projet+introuvable'
      );
      return;
    }
    if (hasPrismaCode(error, 'P2002')) {
      res.redirect(
        '/admin/dashboard?section=projects&error=Ce+slug+existe+d%C3%A9j%C3%A0'
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

  if (Number.isNaN(id)) {
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
  } catch (error) {
    console.error('[adminDashboard] postDeleteProject error:', error);
    if (hasPrismaCode(error, 'P2025')) {
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
// POST /admin/trees — Créer un arbre + associations projets
// ============================================================

export async function postCreateTree(
  req: Request,
  res: Response
): Promise<void> {
  const body = { ...req.body, picture: resolvePicture(req) };
  const result = createTreeSchema.safeParse(body);

  if (!result.success) {
    redirectValidationError(res, 'trees', result.error);
    return;
  }

  const projectsResult = treeProjectsSchema.safeParse(req.body);
  const { projectIds, stocks } = projectsResult.success
    ? projectsResult.data
    : { projectIds: [], stocks: {} };

  try {
    await prisma.$transaction(async (tx) => {
      const tree = await tx.tree.create({ data: result.data });

      if (projectIds && projectIds.length > 0) {
        await tx.projectHasTree.createMany({
          data: projectIds.map((projectId) => ({
            treeId: tree.id,
            projectId: Number(projectId),
            stock: stocks?.[projectId] ?? 0,
          })),
        });
      }
    });

    res.redirect(
      '/admin/dashboard?section=trees&success=Arbre+cr%C3%A9%C3%A9+avec+succ%C3%A8s'
    );
  } catch (error) {
    console.error('[adminDashboard] postCreateTree error:', error);
    if (hasPrismaCode(error, 'P2002')) {
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
// POST /admin/trees/:id — Modifier un arbre + associations
// ============================================================

export async function postUpdateTree(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.redirect('/admin/dashboard?section=trees&error=Identifiant+invalide');
    return;
  }

  const body = { ...req.body, picture: resolvePicture(req) };
  const result = updateTreeSchema.safeParse(body);

  if (!result.success) {
    redirectValidationError(res, 'trees', result.error);
    return;
  }

  const projectsResult = treeProjectsSchema.safeParse(req.body);
  const { projectIds, stocks } = projectsResult.success
    ? projectsResult.data
    : { projectIds: [], stocks: {} };

  try {
    await prisma.$transaction(async (tx) => {
      await tx.tree.update({ where: { id }, data: result.data });
      await tx.projectHasTree.deleteMany({ where: { treeId: id } });

      if (projectIds && projectIds.length > 0) {
        await tx.projectHasTree.createMany({
          data: projectIds.map((projectId) => ({
            treeId: id,
            projectId: Number(projectId),
            stock: stocks?.[projectId] ?? 0,
          })),
        });
      }
    });

    res.redirect(
      '/admin/dashboard?section=trees&success=Arbre+mis+%C3%A0+jour'
    );
  } catch (error) {
    console.error('[adminDashboard] postUpdateTree error:', error);
    if (hasPrismaCode(error, 'P2025')) {
      res.redirect('/admin/dashboard?section=trees&error=Arbre+introuvable');
      return;
    }
    if (hasPrismaCode(error, 'P2002')) {
      res.redirect(
        '/admin/dashboard?section=trees&error=Ce+slug+existe+d%C3%A9j%C3%A0'
      );
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

  if (Number.isNaN(id)) {
    res.redirect('/admin/dashboard?section=trees&error=Identifiant+invalide');
    return;
  }

  try {
    await prisma.tree.delete({ where: { id } });
    res.redirect('/admin/dashboard?section=trees&success=Arbre+supprim%C3%A9');
  } catch (error) {
    console.error('[adminDashboard] postDeleteTree error:', error);
    if (hasPrismaCode(error, 'P2003')) {
      res.redirect(
        '/admin/dashboard?section=trees&error=Impossible+de+supprimer+cet+arbre+car+il+est+utilis%C3%A9'
      );
      return;
    }
    if (hasPrismaCode(error, 'P2025')) {
      res.redirect('/admin/dashboard?section=trees&error=Arbre+introuvable');
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
