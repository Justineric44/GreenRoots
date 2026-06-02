import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler.js';
import { router } from './routers/index.router.js';
import searchRouter from './routers/searchRouter.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'GreenRoots API is running' });
});

app.use('/api', router);
app.use('/api/search', searchRouter);

app.use(errorHandler);

export default app;
