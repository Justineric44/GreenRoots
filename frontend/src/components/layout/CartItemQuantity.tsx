'use client';

import { useState } from 'react';
import { changeQuantityAction } from '@/app/panier/actions';

export default function CartItemQuantity({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Une seule fonction pour les deux boutons (on lui passe la nouvelle quantité)
  async function handleChange(newQuantity: number) {
    setErrorMessage(null); // on repart propre
    const result = await changeQuantityAction(cartItemId, newQuantity);
    if (!result.ok) {
      setErrorMessage(result.message); // on affiche le message du back
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center hover:opacity-80 disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 h-8 border flex items-center justify-center text-sm font-semibold">
          {quantity}
        </span>
        <button
          onClick={() => handleChange(quantity + 1)}
          className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center hover:opacity-80"
        >
          +
        </button>
      </div>
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}
