'use client';

import Image from 'next/image';
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
    <header className="flex w-full items-center justify-between bg-brand-dark/70 px-4 py-3 font-heading">
      <Link href="/" aria-label="Retour à l'accueil">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden">
          <Image
            src="/images/Logo_blanc_transparent.svg"
            alt="Logo GreenRoots - Aller à l'accueil"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link href={isLoggedIn ? '/espace-client' : '/authentification'}>
          <button
            type="button"
            className={
              isLoggedIn
                ? 'p-2 text-brand-accent hover:opacity-80'
                : 'p-2 text-white hover:text-[#88B75D]'
            }
            aria-label={isLoggedIn ? 'Mon espace client' : 'Connexion'}
          >
            <User size={25} />
          </button>
        </Link>

        <Link href="/panier">
          <button
            type="button"
            className="p-2 text-white hover:text-[#88B75D]"
            aria-label="Panier"
          >
            <ShoppingCart size={25} />
          </button>
        </Link>

        <button
          type="button"
          onClick={onOpen}
          aria-label="Ouvrir le menu"
          className="p-2 text-white hover:text-[#88B75D]"
        >
          <Menu size={26} />
        </button>
      </div>
    </header>
  );
}
