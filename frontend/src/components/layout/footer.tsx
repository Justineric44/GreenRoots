import Link from 'next/link';

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
];

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-between p-4 bg-green-100">
      <Link href="/">GreenRoots</Link>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <nav>
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
          </ul>
        </div>
      </nav>
    </footer>
  );
}
