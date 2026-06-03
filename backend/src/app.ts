import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import { errorHandler } from './middlewares/errorHandler.js';
import { router } from './routers/index.router.js';
import searchRouter from './routers/searchRouter.js';
import { adminRouter } from './routers/admin.router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(
  helmet({
    // Nécessaire pour charger le CSS admin servi par Express
    contentSecurityPolicy: false,
  })
);
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
