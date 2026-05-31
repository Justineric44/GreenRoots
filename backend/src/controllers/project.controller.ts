import type { Request, Response } from 'express';
import { NotFoundError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import { parseSlugFromParams } from '../validators/slug.validator.js';
import type { Prisma } from '@prisma/client';

export async function getAllProjects(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = 6;
  const [projects, total] = await prisma.$transaction([
    prisma.project.findMany({
      take: limit,
      skip: limit * (page - 1),
      select: {
        id: true,
        name: true,
        shortDescription: true,
        slug: true,
        localisation: true,
        picture: true,
        progress: true,
      },
    }),
    prisma.project.count(),
  ]);
  if (projects.length === 0) {
    throw new NotFoundError();
  }
  res.json({ projects, total });
}

export async function getOneProject(req: Request, res: Response) {
  const slug = parseSlugFromParams(req.params.slug);
  const project = await prisma.project.findUnique({
    where: { slug },
  });
  if (!project) {
    throw new NotFoundError();
  }
  res.json(project);
}

export async function getAllTreesByProjectSlug(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = 6;
  const slug = parseSlugFromParams(req.params.slug);
  const [trees, total] = await prisma.$transaction([
    prisma.projectHasTree.findMany({
      where: { project: { slug } },
      take: limit,
      skip: limit * (page - 1),
      include: {
        tree: true,
      },
    }),
    prisma.projectHasTree.count({ where: { project: { slug } } }),
  ]);

  if (trees.length === 0) {
    throw new NotFoundError();
  }
  res.json(
    // Returns trees with their available stock for this project
    {
      total,
      trees: trees.map(
        (
          item: Prisma.ProjectHasTreeGetPayload<{ include: { tree: true } }>
        ) => ({
          ...item.tree,
          stock: item.stock,
        })
      ),
    }
  );
}
