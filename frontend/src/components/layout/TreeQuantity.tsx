'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TreeQuantity() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center hover:opacity-80"
        >
          −
        </button>
        <span className="w-8 h-8 border flex items-center justify-center text-sm font-semibold">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center hover:opacity-80"
        >
          +
        </button>
      </div>
      <Button
        className="bg-brand-accent text-white px-6"
        disabled
        title="Connectez-vous pour ajouter au panier"
      >
        🛒 Planter {quantity} arbre{quantity > 1 ? 's' : ''}
      </Button>
    </div>
  );
}
