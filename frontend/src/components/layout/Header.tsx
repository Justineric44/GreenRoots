'use client';

import { useState } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import MobileSearch from './MobileSearch';
import Link from 'next/link';

const MENU = [
  { label: 'Arbres', href: '/arbres' },
  { label: 'Projets', href: '/projets' },
  { label: 'A propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="md:hidden">
        <MobileHeader
          isLoggedIn={isLoggedIn}
          onOpen={() => setMobileOpen((prev) => !prev)}
        />

        <div
          className={`overflow-hidden bg-brand-dark/70 transition-all duration-300 ${
            mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/10 px-4 py-4 text-white">
            <MobileSearch />

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
        <DesktopHeader menu={MENU} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
