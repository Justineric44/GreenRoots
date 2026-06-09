import Link from 'next/link';
import Image from 'next/image';
import CookieSettingsButton from './CookieSettingsButton';

const companyLinks = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
  { label: 'Nos Arbres', href: '/arbres' },
  { label: 'Nos Projets', href: '/projets' },
];

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGV', href: '/conditions-generales-ventes' },
  { label: 'CGU', href: '/conditions-generales-utilisations' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 items-center justify-between p-4 bg-brand-dark text-brand-white md:flex-row">
      <Link href="/">
        <div className="w-30 h-30 border-white/60 overflow-hidden flex items-center justify-center">
          <Image
            src="/images/Logo_blanc_transparent.svg"
            alt="Logo GreenRoots - Plateforme de reforestation et d'achat d'arbres"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
        <nav>
          <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="!text-brand-white/80 transition-colors hover:!text-[#88B75D]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Liens légaux">
          <h2 className="mb-4 text-lg font-semibold">Informations légales</h2>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="!text-brand-white/80 transition-colors hover:!text-[#88B75D]"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-brand-white/20 pt-6 text-center text-sm text-brand-white/60">
        © 2026 GreenRoots. Tous droits réservés.
      </div>
    </footer>
  );
}
