import { apiFetch } from '@/lib/api';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ================================================================
// ROUTE API : DÉCONNEXION DE L'UTILISATEUR
// ================================================================
// Cette route gère le logout en deux temps :
// 1. Notification au backend pour les traitements côté serveur
// 2. Suppression du cookie de token côté client

/**
 * Endpoint POST pour la déconnexion de l'utilisateur.
 * Invalide la session en supprimant le token JWT.
 */
export const POST = async () => {
  try {
    // Appel interne vers l'API backend de logout pour prévenir le backend de la deconnexion.
    // À terme, cette route pourra être utilisée pour blacklister le token JWT côté serveur.
    await apiFetch(`/api/auth/logout`, {
      method: 'POST',
    });
  } catch (error) {
    // En cas d'erreur backend, on continue malgré tout la suppression du cookie client.
    // L'erreur est loggée mais ne bloque pas la déconnexion.
    NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Erreur contact backend',
      },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();

  // Supprime le cookie de token côté client dans tous les cas (même en cas d'erreur backend).
  // Cela garantit une déconnexion locale même si le backend rencontre un problème.
  cookieStore.delete('token');

  // Retourne une réponse JSON indiquant que la déconnexion a réussi.
  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
};
