'use client';

import { useState } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import Link from 'next/link';
import { Search } from 'lucide-react';

const MENU = [
  { label: 'Arbres', href: '/arbres' },
  { label: 'Projets', href: '/projets' },
  { label: 'A propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="md:hidden">
        <MobileHeader onOpen={() => setMobileOpen((v) => !v)} />

        <div
          className={`overflow-hidden bg-brand-dark/70 transition-all duration-300 ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/10 px-4 py-4 text-white">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/20 px-4 py-3">
              <Search size={18} className="text-white/70" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-transparent outline-none placeholder:text-white/60"
              />
            </div>

            <nav className="flex flex-col gap-3">
              {MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="transition-colors hover:text-[#88B75D]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <DesktopHeader menu={MENU} />
      </div>
    </header>
  );
}
