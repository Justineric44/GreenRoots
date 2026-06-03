'use server';

import { changeCartItemQuantity, clearCart, deleteCartItem } from '@/lib/api';
import { ApiError } from '@/lib/errors';
import { revalidatePath } from 'next/cache';

// Le résultat que l'action renvoie au client (au lieu de jeter une erreur)
type ActionResult = { ok: true } | { ok: false; message: string };

export async function changeQuantityAction(
  cartItemId: number,
  quantity: number
): Promise<ActionResult> {
  try {
    await changeCartItemQuantity(cartItemId, quantity);
    revalidatePath('/panier');
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Une erreur est survenue' };
  }
}

export async function clearCartAction(): Promise<ActionResult> {
  try {
    await clearCart();
    revalidatePath('/panier');
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Une erreur est survenue' };
  }
}

export async function deleteItemAction(
  cartItemId: number
): Promise<ActionResult> {
  try {
    await deleteCartItem(cartItemId);
    revalidatePath('/panier');
    return { ok: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Une erreur est survenue' };
  }
}
