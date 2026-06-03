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
            alt="GreenRoots Logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </Link>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav className="w-100 flex flex-row items-top justify-center gap-10">
        <div>
          <ul>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
}
