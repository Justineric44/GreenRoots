import { cookies } from 'next/headers';

// ================================================================
// MODULE DE CENTRALISATION DES APPELS API
// ================================================================
// Ce fichier centralise tous les appels vers l'API backend.
// Il fournit des fonctions réutilisables pour :
// - Les requêtes publiques (apiFetch)
// - Les requêtes authentifiées avec token (apiFetchPrivate)
// - Les appels spécifiques

// URL de base de l'API backend récupérée des variables d'environnement
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fonction de base pour effectuer des appels API publics.
 * @param endpoint - Le chemin de l'endpoint (ex: '/api/projects')
 * @param options - Options fetch optionnelles (method, headers, body, etc.)
 * @returns Réponse JSON parsée de l'API
 * @throws Erreur si la réponse n'est pas ok (status >= 400)
 */
export async function apiFetch(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${endpoint}`);
  }
  return response.json();
}

/**
 * Récupère le token JWT stocké dans les cookies de la session.
 * @returns Le token JWT ou undefined s'il n'existe pas
 */
async function getToken() {
  const token = (await cookies()).get('token')?.value;
  return token;
}

/**
 * Fonction pour effectuer des appels API privés/authentifiés.
 * Ajoute automatiquement le token JWT dans l'en-tête Authorization.
 * @param endpoint - Le chemin de l'endpoint
 * @param options - Options fetch optionnelles
 * @returns Réponse JSON parsée de l'API
 */
export async function apiFetchPrivate(endpoint: string, options?: RequestInit) {
  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${await getToken()}`,
  };
  return apiFetch(endpoint, { ...options, headers });
}

// ================================================================
// ROUTES PUBLIQUES
// ================================================================

/**
 * Récupère la liste paginée des projets.
 * @param currentPage - Numéro de la page
 * @returns Liste des projets de la page demandée
 */
export async function getProjects(currentPage: number) {
  return apiFetch(`/api/projects?page=${currentPage}`);
}

/**
 * Récupère les détails d'un projet spécifique.
 * @param slug - Identifiant/slug du projet
 * @returns Données du projet
 */
export async function getOneProject(slug: string) {
  return apiFetch(`/api/projects/${slug}`);
}

/**
 * Récupère la liste paginée des arbres d'un projet.
 * @param slug - Identifiant/slug du projet
 * @param currentPage - Numéro de la page
 * @returns Liste des arbres du projet
 */
export async function getProjectTrees(slug: string, currentPage: number) {
  return apiFetch(`/api/projects/${slug}/trees?page=${currentPage}`);
}

/**
 * Récupère la liste paginée des arbres.
 * @param currentPage - Numéro de la page
 * @returns Liste des arbres de la page demandée
 */
export async function getTrees(
  currentPage: number = 1,
  filters?: {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  }
) {
  const params = new URLSearchParams();
  params.set('page', String(currentPage));
  if (filters?.search) params.set('search', filters.search);
  if (filters?.minPrice) params.set('minPrice', filters.minPrice);
  if (filters?.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters?.sortBy) params.set('sortBy', filters.sortBy);
  if (filters?.sortOrder) params.set('sortOrder', filters.sortOrder);
  return apiFetch(`/api/trees?${params.toString()}`);
}

/**
 * Récupère les détails d'un arbre spécifique.
 * @param slug - Identifiant/slug de l'arbre
 * @returns Données de l'arbre
 */
export async function getOneTree(slug: string) {
  return apiFetch(`/api/trees/${slug}`);
}

// ================================================================
// ROUTES PRIVÉES - À IMPLÉMENTER
// ================================================================
// Utiliser apiFetchPrivate pour tous les appels nécessitant une auth.
// Exemple :
// export async function getMe() {
//   return apiFetchPrivate('/api/users/me');
// }
//
// Routes à implémenter :
// USER
// - GET    /api/users/me                → récupérer l'utilisateur connecté
// - PUT    /api/users/me                → modifier les informations de l'utilisateur
// - DELETE /api/users/me                → supprimer son propre compte
// - GET    /api/users/me/orders         → consulter les commandes de l'utilisateur
// - GET    /api/users/me/orders/:id     → consulter une commande spécifique
//
// ORDER
// - POST   /api/orders                  → passer commande
//
// CART
// - GET    /api/carts                   → voir le panier actif
// - POST   /api/carts/items             → ajouter un arbre au panier
// - PATCH  /api/carts/items/:id         → modifier la quantité d'un arbre
// - DELETE /api/carts/items/:id         → supprimer un arbre du panier
// - ??? DELETE /api/carts               → supprimer le panier
// ================================================================
