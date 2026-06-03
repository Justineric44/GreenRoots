'use client';

import { deleteItemAction } from '@/app/panier/actions';
import { Trash } from 'lucide-react';

export default function CartDeleteItem({ cartItemId }: { cartItemId: number }) {
  async function handleClear() {
    await deleteItemAction(cartItemId);
  }
  return (
    <button
      onClick={handleClear}
      className="text-brand-dark hover:text-red-600 p-2 rounded-full bg-white/80 p-2 hover:bg-white shadow-md "
    >
      <Trash size={20} />
    </button>
  );
}
