import express from 'express';

const app = express();

// Middlewares globaux
app.use(express.json());
// Permet de récupérer les données envoyées par les formulaires HTML (EJS) dans req.body.
app.use(express.urlencoded({ extended: true }));

// Route temporaire de test
app.get('/', (_req, res) => {
  res.json({ message: 'GreenRoots API is running' });
});

export default app;
