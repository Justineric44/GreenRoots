'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-transparent absolute top-0 left-0 right-0 z-50">
      {/* Logo circulaire */}
      <Link href="/">
        <div className="w-16 h-16 rounded-full border-2 border-white/60 overflow-hidden flex items-center justify-center bg-white/10">
          <Image
            src="public/images/logo_blanc.svg"
            alt="GreenRoots Logo"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Liens de navigation centrés */}
      <ul className="flex items-center gap-10 text-sm font-medium text-white">
        <li>
          <Link
            href="/a-propos"
            className="hover:text-green-300 transition-colors"
          >
            A propos
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-green-300 transition-colors">
            Accueil
          </Link>
        </li>
        <li>
          <Link
            href="/projets"
            className="hover:text-green-300 transition-colors"
          >
            Projets
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-green-300 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Recherche + icônes */}
      <div className="flex items-center gap-3">
        <InputGroup className="w-48">
          <InputGroupInput
            placeholder="Rechercher..."
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
          />
          <InputGroupAddon>
            <Search className="w-4 h-4 text-white" />
          </InputGroupAddon>
        </InputGroup>

        {/* Connexion */}
        <Link href="/connexion">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-green-300"
          >
            <User className="w-5 h-5" />
          </Button>
        </Link>

        {/* Panier */}
        <Link href="/panier">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-green-300"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}
