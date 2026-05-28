import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routers/index.router.js';

const app = express();
app.use(cors()); // Permet de gérer les requêtes cross-origin (CORS)
app.use(helmet()); // Aide à sécuriser l'application en définissant divers en-têtes HTTP

// Middlewares globaux
app.use(express.json());
// Permet de récupérer les données envoyées par les formulaires HTML (EJS) dans req.body.
app.use(express.urlencoded({ extended: true }));

// Route temporaire de test
app.get('/', (_req, res) => {
  res.json({ message: 'GreenRoots API is running' });
});

app.use(router);

export default app;
