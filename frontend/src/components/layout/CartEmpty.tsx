'use client';

import { useState } from 'react';
import { clearCartAction } from '@/lib/actions/cart';
import { Button } from '../ui/button';
import { useCart } from '@/components/cart/CartProvider';

// Bloc d'action utilisé pour vider complètement le panier.
// Le composant gère une confirmation avant suppression afin d'éviter
// qu'un clic accidentel ne vide immédiatement le panier de l'utilisateur.
export default function CartEmpty() {
  // État local qui contrôle l'affichage de la confirmation.
  // Tant qu'il est à `false`, seul le bouton principal est visible.
  const [isConfirming, setIsConfirming] = useState(false);

  // Fonction globale de rafraîchissement du panier fournie par le contexte.
  // Elle permet de remettre immédiatement l'interface à jour après la suppression.
  const { refreshCart } = useCart();

  // Exécute la suppression complète du panier.
  // L'action serveur vide le panier côté backend, puis on recharge les données
  // pour synchroniser le compteur et l'état affiché dans l'application.
  async function handleClear() {
    await clearCartAction();
    await refreshCart();

    // Une fois l'opération terminée, on referme le panneau de confirmation
    // pour revenir à l'état normal de l'interface.
    setIsConfirming(false);
  }

  return (
    <>
      {/* Bouton principal : il n'efface rien immédiatement, il ouvre d'abord
          une confirmation explicite pour sécuriser l'action. */}
      <Button onClick={() => setIsConfirming(true)} variant="outline">
        Vider le panier
      </Button>

      {/* Les actions de confirmation n'apparaissent que lorsque l'utilisateur
          a demandé explicitement la suppression du contenu du panier. */}
      {isConfirming && (
        <div className="flex gap-4">
          {/* Bouton de validation : déclenche réellement la suppression du panier. */}
          <Button onClick={handleClear} variant="destructive">
            Valider
          </Button>

          {/* Bouton d'annulation : ferme simplement la confirmation sans rien modifier. */}
          <Button onClick={() => setIsConfirming(false)} variant="outline">
            Annuler
          </Button>
        </div>
      )}
    </>
  );
}
