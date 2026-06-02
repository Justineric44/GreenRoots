'use client';

import { ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DesktopSearch from './DesktopSearch';

interface DesktopHeaderProps {
  menu: { label: string; href: string }[];
}

export default function DesktopHeader({ menu }: DesktopHeaderProps) {
  return (
    <nav className="flex items-center justify-between px-4 py-4 absolute top-0 left-0 right-0 z-50 font-heading bg-brand-dark/70">
      {/* Logo */}
      <Link href="/">
        <div className="w-17 h-17 border-white/60 overflow-hidden flex items-center justify-center">
          <Image
            src="/images/Logo_blanc_transparent.svg"
            alt="GreenRoots Logo"
            width={3500}
            height={3500}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Droite : nav + recherche + icônes */}
      <div className="flex items-center gap-8">
        {/* Liens de navigation */}
        <ul
          className="flex items-center gap-8 font-medium text-white"
          style={{ fontSize: '18px' }}
        >
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-[#88B75D] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Recherche avec dropdown */}
        <DesktopSearch />

        {/* Authentification */}
        <Link href="/authentification">
          <button className="text-white hover:text-[#88B75D] p-2">
            <User size={25} />
          </button>
        </Link>

        {/* Panier */}
        <Link href="/panier">
          <button className="text-white hover:text-[#88B75D] p-2">
            <ShoppingCart size={25} />
          </button>
        </Link>
      </div>
    </nav>
  );
}
