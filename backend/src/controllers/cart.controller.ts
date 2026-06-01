import type { Request, Response } from 'express';
import { NotFoundError, ValidationError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import { getOrCreateActiveCart } from '../lib/cartUtils.js';

export async function getActiveCart(req: Request, res: Response) {
  // Récupère l'utilisateur courant depuis le token de session
  const userId = Number(req.user?.userId);

  // Crée un panier actif si besoin ou récupère celui existant
  const cart = await getOrCreateActiveCart(userId);

  // Inclut les détails des articles, des arbres et des projets associés
  const cartWithItems = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      items: {
        select: {
          quantity: true,
          id: true,
          tree: {
            select: {
              commonName: true,
              price: true,
              picture: true,
            },
          },
          project: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!cartWithItems) {
    throw new NotFoundError();
  }

  // Calcule le total du panier en multipliant quantité par prix
  const cartTotal = cartWithItems.items.reduce(
    (acc, item) => acc + item.quantity * Number(item.tree.price),
    0
  );

  res.json({ cartWithItems, cartTotal });
}

export async function addItemToCart(req: Request) {
  // Récupère l'utilisateur courant depuis le token de session
  const userId = Number(req.user?.userId);

  // Récupère les infos envoyés depuis le front
  const { treeId, projectId, quantity } = req.body;

  // Crée un panier actif si besoin ou récupère celui existant
  const cart = await getOrCreateActiveCart(userId);
  console.log(cart);

  // Vérifie si l'arbre existe dans le projet
  const treeAndProject = await prisma.projectHasTree.findUnique({
    where: {
      projectId_treeId: { projectId, treeId },
    },
  });
  if (!treeAndProject) {
    throw new NotFoundError('Arbre ou projet introuvable');
  }

  // Vérifie le stock de cet arbre pour ce projet
  const stock = treeAndProject.stock;
  if (quantity > stock) {
    throw new ValidationError('Quantité non disponible');
  }

  // Vérifie si l'arbre est déjà dans le panier
}
