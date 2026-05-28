'use client';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav
      className="flex items-center justify-between px-4 py-4 absolute top-0 left-0 right-0 z-50 font-heading"
      style={{ backgroundColor: 'rgba(33, 42, 37, 0.5)' }}
    >
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
          <li>
            <Link
              href="/a-propos"
              className="hover:text-[#88B75D] transition-colors"
            >
              A propos
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#88B75D] transition-colors">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/projets"
              className="hover:text-[#88B75D] transition-colors"
            >
              Projets
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-[#88B75D] transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Recherche */}
        <InputGroup className="w-48">
          <InputGroupInput
            placeholder="Rechercher..."
            className="border-white/30 text-white placeholder:text-white/60"
          />
          <InputGroupAddon>
            <Search className="w-5 h-5 text-white" />
          </InputGroupAddon>
        </InputGroup>

        {/* Connexion */}
        <Link href="/connexion">
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
