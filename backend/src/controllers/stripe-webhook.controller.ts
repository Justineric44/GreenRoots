import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../lib/prisma.js';
import { ValidationError } from '../lib/errors.js';
import { createOrderFromActiveCart } from '../services/order.service.js';
import { sendOrderConfirmationEmail } from '../services/mail.service.js';

// Gère l'appel envoyé par Stripe lorsqu'un paiement est finalisé.
// Ce point d'entrée valide l'événement, puis déclenche la logique métier
// qui transforme le panier actif en commande confirmée.
export async function handleStripeWebhook(req: Request, res: Response) {
  // Récupère les variables de configuration nécessaires pour communiquer avec l'API Stripe.
  // La clé secrète sert à initialiser le client Stripe, tandis que le secret webhook
  // permet de vérifier l'authenticité des événements envoyés par Stripe.
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    throw new Error('Stripe webhook configuration is missing');
  }

  const stripe = new Stripe(stripeSecretKey);

  // Stripe envoie un en-tête signature pour prouver que la requête vient bien de lui.
  // Sans cette signature, nous ne pouvons pas garantir l'origine de l'événement.
  const signature = req.headers['stripe-signature'];

  if (!signature) {
    throw new ValidationError('Missing Stripe signature');
  }

  let event: Stripe.Event;

  // Vérifie que le webhook a bien été envoyé par Stripe.
  // Cette étape confirme que le payload n'a pas été altéré et qu'il provient bien de Stripe.
  // Si la signature est invalide ou que le contenu a été modifié,
  // Stripe lève une exception que l'on transforme en erreur de validation.
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      stripeWebhookSecret
    );
  } catch {
    throw new ValidationError('Invalid Stripe signature');
  }

  // Si l'événement correspond à une session de paiement terminée,
  // on récupère les métadonnées de Stripe liées au panier et à l'utilisateur.
  // Ces informations permettent de retrouver le panier payé et de créer la commande.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = Number(session.metadata?.userId);
    const cartId = Number(session.metadata?.cartId);

    // Les métadonnées envoyées par Stripe doivent être présentes pour
    // relier correctement la session de paiement au panier utilisateur.
    if (!userId || !cartId) {
      throw new ValidationError('Missing Stripe metadata');
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        cartId,
      },
    });

    if (existingOrder) {
      return res.status(200).json({
        received: true,
        message: 'Order already exists for this cart',
      });
    }

    // On transforme maintenant le panier actif en commande validée grâce à
    // une transaction Prisma. Cette étape centralise la création de l'ordre
    // et les mises à jour liées au panier dans une seule opération cohérente.
    const order = await prisma.$transaction((tx) =>
      createOrderFromActiveCart(tx, userId, cartId)
    );

    // Envoi du mail de confirmation après création de la commande.
    // Si l'e-mail échoue, on ne bloque pas le webhook : la commande a déjà été créée.
    try {
      await sendOrderConfirmationEmail(
        order.user.email,
        order.user.firstName,
        String(order.id)
      );
    } catch (error) {
      console.error('Erreur lors de l’envoi du mail de confirmation', error);
    }

    console.log('Order created after Stripe payment', {
      userId,
      cartId,
    });
  }

  // Réponse positive à Stripe pour lui confirmer que l'événement a bien été traité.
  return res.status(200).json({
    received: true,
  });
}
