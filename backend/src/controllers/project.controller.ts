import type { Request, Response } from 'express';
import { NotFoundError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import type { Prisma } from '@prisma/client';

export async function getAllProjects(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const localisation = req.query.localisation as string | undefined;
  const search = req.query.search as string | undefined;
  const sortOrder = (req.query.sortOrder as string) === 'desc' ? 'desc' : 'asc';
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
      return res.status(200).json({ projects: [] });
    }
    res.status(200).json({ projects });
    return;
  } else {
    const where: Prisma.ProjectWhereInput = {
      AND: [
        localisation
          ? { localisation: { contains: localisation, mode: 'insensitive' } }
          : {},
        search ? { name: { contains: search, mode: 'insensitive' } } : {},
      ],
    };
    const select = {
      id: true,
      name: true,
      shortDescription: true,
      slug: true,
      localisation: true,
      picture: true,
      progress: true,
    };
    // Si params page, on renvoi les projets
    const limit = 6;
    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy: { name: sortOrder },
        take: limit,
        skip: limit * (page - 1),
        select,
      }),
      prisma.project.count({
        where,
      }),
    ]);
    if (projects.length === 0 && total > 0) {
      throw new NotFoundError();
    }
    if (total === 0) {
      return res.status(200).json({ projects: [], total, limit });
    }
    res.status(200).json({ projects, total, limit });
  }
}

export async function getProjectsLocalisations(req: Request, res: Response) {
  const projects = await prisma.project.findMany({
    select: { localisation: true },
    distinct: ['localisation'],
  });
  const localisations = projects.map((project) => project.localisation);
  res.status(200).json({ localisations });
}

export async function getOneProject(req: Request, res: Response) {
  const slug = req.params.slug as string;
  const project = await prisma.project.findUnique({
    where: { slug },
  });
  if (!project) {
    throw new NotFoundError();
  }
  res.status(200).json(project);
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
  res.status(200).json(
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
