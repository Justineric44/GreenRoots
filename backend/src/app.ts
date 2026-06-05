import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middlewares/errorHandler.js';
import { router } from './routers/index.router.js';
import searchRouter from './routers/search.router.js';
import { adminRouter } from './routers/admin.router.js';
import { router as stripeWebhookRouter } from './routers/stripe-webhook.router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Activation de CORS pour autoriser les appels du front-end vers l'API.
// L'origine est définie par FRONTEND_URL en production, avec une valeur par défaut
// locale pour les tests et le développement.
// credentials: true est indispensable pour que les cookies d'authentification
// soient envoyés et conservés par le navigateur lors des requêtes croisées.
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  helmet({
    // Nécessaire pour charger le CSS admin servi par Express
    contentSecurityPolicy: false,
  })
);

// Route dédiée aux webhooks Stripe.
// Elle reçoit les événements envoyés par Stripe après un paiement,
// sans passer par les routes API classiques, pour valider la commande.
app.use('/api/webhooks', stripeWebhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- Template engine EJS ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// ---- Fichiers statiques admin (CSS, JS) ----
app.use(
  '/admin/static',
  express.static(path.join(__dirname, '../public/admin'))
);

// ---- Routes API ----
app.get('/', (_req, res) => {
  res.json({ message: 'GreenRoots API is running' });
});

app.use('/api', router);
app.use('/api/search', searchRouter);

// ---- Routes Admin ----
app.use('/admin', adminRouter);

app.use(errorHandler);

export default app;
