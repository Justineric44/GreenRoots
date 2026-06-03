'use client';

import { useState } from 'react';
import { clearCartAction } from '@/app/panier/actions';
import { Button } from '../ui/button';

export default function CartEmpty() {
  const [isConfirming, setIsConfirming] = useState(false);
  async function handleClear() {
    await clearCartAction();
    setIsConfirming(false);
  }
  return (
    <>
      <Button onClick={() => setIsConfirming(true)} variant="ghost">
        Vider le panier
      </Button>
      {isConfirming && (
        <div className="flex gap-4">
          <Button onClick={handleClear} variant="destructive">
            Valider
          </Button>
          <Button onClick={() => setIsConfirming(false)} variant="outline">
            Annuler
          </Button>
        </div>
      )}
    </>
  );
}
