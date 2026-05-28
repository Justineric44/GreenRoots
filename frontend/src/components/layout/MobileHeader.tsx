'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, User } from 'lucide-react';

interface MobileHeaderProps {
  onOpen: () => void;
}

export default function MobileHeader({ onOpen }: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-brand-dark/70 font-heading">
      <Link href="/" className="flex items-center">
        <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
          <Image
            src="/images/Logo_blanc_transparent.svg"
            alt="GreenRoots Logo"
            width={1000}
            height={1000}
            className="object-contain"
          />
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link href="/connexion">
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
