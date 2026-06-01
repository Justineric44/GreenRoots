import { Router } from 'express';
import * as treesController from '../controllers/trees.controller.js';

export const router = Router();

router.get('/trees', treesController.getAllTrees);
router.get('/trees/:slug', treesController.getOneTree);
router.get('/:slug/projects', treesController.getAllProjectsByTreeSlug);
