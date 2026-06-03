'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, User } from 'lucide-react';

interface MobileHeaderProps {
  onOpen: () => void;
  isLoggedIn: boolean;
}

export default function MobileHeader({
  onOpen,
  isLoggedIn,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-brand-dark/70 font-heading">
      <Link href={isLoggedIn ? '/espace-client' : '/authentification'}>
        <button
          className={
            isLoggedIn
              ? 'rounded-full bg-brand-accent p-2 text-white'
              : 'p-2 text-white hover:text-[#88B75D]'
          }
          title={isLoggedIn ? 'Mon espace client' : 'Connexion'}
        >
          <User size={25} />
        </button>
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/authentification">
          <button className="text-white hover:text-[#88B75D] p-2">
            <User size={25} />
          </button>
        </Link>
        <Link href="/panier">
          <button className="text-white hover:text-[#88B75D] p-2">
            <ShoppingCart size={25} />
          </button>
        </Link>

        <button
          type="button"
          onClick={onOpen}
          aria-label="Ouvrir le menu"
          className="p-2 text-white"
        >
          <Menu size={26} />
        </button>
      </div>
    </header>
  );
}
