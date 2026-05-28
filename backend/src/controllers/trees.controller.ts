import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../lib/errors.js';

// ─────────────────────────────────────────────
// GET /api/trees
// ─────────────────────────────────────────────
export async function getAllTrees(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = 9;
  const [trees, total] = await prisma.$transaction([
    prisma.tree.findMany({
      take: limit,
      skip: limit * (page - 1),
      select: {
        id: true,
        commonName: true,
        family: true,
        origin: true,
        slug: true,
        picture: true,
      },
    }),
    prisma.tree.count(),
  ]);
  if (trees.length === 0) {
    throw new NotFoundError();
  }
  res.json({ trees, total });
}

// ─────────────────────────────────────────────
// GET /api/trees/:slug
// ─────────────────────────────────────────────
export async function getOneTree(req: Request, res: Response) {
  const slug = req.params.slug as string;

  const tree = await prisma.tree.findUnique({ where: { slug } });
  if (!tree) throw new NotFoundError('Tree not found');

  res.json(tree);
}
