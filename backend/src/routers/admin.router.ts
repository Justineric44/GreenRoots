// ============================================================
//  src/routers/admin.router.ts
//  Toutes les routes de l'interface admin
//
//  Routes publiques (sans middleware) :
//    GET  /admin/login
//    POST /admin/login
//
//  Routes protégées (requireAdmin) :
//    POST /admin/logout
//    GET  /admin/dashboard
//    POST /admin/projects
//    POST /admin/projects/:id
//    POST /admin/projects/:id/delete
//    POST /admin/trees
//    POST /admin/trees/:id
//    POST /admin/trees/:id/delete
//    POST /admin/users/:id/delete
// ============================================================

import { Router } from 'express';
import { requireAdmin } from '../middlewares/adminAuth.middleware.js';
import {
  getLogin,
  postLogin,
  postLogout,
} from '../controllers/admin/adminAuth.controller.js';
import {
  getDashboard,
  postCreateProject,
  postUpdateProject,
  postDeleteProject,
  postCreateTree,
  postUpdateTree,
  postDeleteTree,
  postDeleteUser,
} from '../controllers/admin/adminDashboard.controller.js';

export const adminRouter = Router();

// ============================================================
// Routes publiques — pas de middleware
// ============================================================

adminRouter.get('/login', getLogin);
adminRouter.post('/login', postLogin);

// ============================================================
// Routes protégées — requireAdmin sur toutes
// ============================================================

adminRouter.post('/logout', requireAdmin, postLogout);

// Dashboard
adminRouter.get('/dashboard', requireAdmin, getDashboard);

// Projets
adminRouter.post('/projects', requireAdmin, postCreateProject);
adminRouter.post('/projects/:id', requireAdmin, postUpdateProject);
adminRouter.post('/projects/:id/delete', requireAdmin, postDeleteProject);

// Arbres
adminRouter.post('/trees', requireAdmin, postCreateTree);
adminRouter.post('/trees/:id', requireAdmin, postUpdateTree);
adminRouter.post('/trees/:id/delete', requireAdmin, postDeleteTree);

// Utilisateurs
adminRouter.post('/users/:id/delete', requireAdmin, postDeleteUser);

// Redirect /admin → /admin/login
adminRouter.get('/', (_req, res) => {
  res.redirect('/admin/login');
});
