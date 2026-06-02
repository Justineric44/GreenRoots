import type { Request, Response } from 'express';
import { NotFoundError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';

export async function getAllProjects(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  // Si pas de params page, on renvoit tous les projets (par exemple sur la page d'accueil)
  if (!req.query.page) {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        shortDescription: true,
        slug: true,
        localisation: true,
        picture: true,
        progress: true,
      },
    });
    if (projects.length === 0) {
      throw new NotFoundError();
    }
    res.json({ projects });
    return;
  } else {
    // Si params page, on renvoi les projets
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
    res.json({ projects, total, limit });
  }
}

export async function getOneProject(req: Request, res: Response) {
  const slug = req.params.slug as string;
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
  const slug = req.params.slug as string;
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
      limit,
      trees: trees.map(({ tree, stock }) => ({
        ...tree,
        stock,
      })),
    }
  );
}
