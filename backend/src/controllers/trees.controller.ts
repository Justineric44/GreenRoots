import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export async function getAllTrees(req: Request, res: Response) {
  // Récupérer tous les arbres en BDD
  const trees = await prisma.tree.findMany();

  // Les renvoyer
  res.json(trees);
}
