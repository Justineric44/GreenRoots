import type { Request, Response } from 'express';
import { NotFoundError, ValidationError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
import { getOrCreateActiveCart } from '../lib/cartUtils.js';
import { addCartItemsSchema } from '../validators/cart.validator.js';

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

  return res.status(200).json({ cartWithItems, cartTotal });
}

export async function addItemToCart(req: Request, res: Response) {
  // Récupère l'utilisateur courant depuis le token de session
  const userId = Number(req.user?.userId);

  // Récupère les infos envoyés depuis le front + validation zod
  const { treeId, projectId, quantity } = addCartItemsSchema.parse(req.body);

  // Récupère (ou crée) le panier actif de l'utilisateur
  const cart = await getOrCreateActiveCart(userId);

  // Vérifie que l'arbre est bien lié au projet demandé
  const treeAndProject = await prisma.projectHasTree.findUnique({
    where: {
      projectId_treeId: { projectId, treeId },
    },
  });
  if (!treeAndProject) {
    throw new NotFoundError('Arbre ou projet introuvable');
  }

  // Cherche si l'article est déjà présent dans le panier
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_treeId_projectId: { cartId: cart.id, treeId, projectId },
    },
  });
  // Récupère le stock pour cet arbre
  const stock = treeAndProject.stock;
  if (cartItem) {
    // L'article existe :
    // Vérifie la quantité disponible en stock
    if (cartItem.quantity + quantity > stock) {
      throw new ValidationError('Quantité non disponible');
    }
    // on incrémente la quantité
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: { quantity: quantity + cartItem.quantity },
    });
    return res.status(200).json({ updatedCartItem });
  } else {
    // L'article n'existe pas :
    // Vérifie la quantité disponible en stock
    if (quantity > stock) {
      throw new ValidationError('Quantité non disponible');
    }
    // on crée une nouvelle ligne
    const newCartItem = await prisma.cartItem.create({
      data: {
        treeId,
        projectId,
        quantity,
        cartId: cart.id,
      },
    });
    return res.status(201).json({ newCartItem });
  }
}
