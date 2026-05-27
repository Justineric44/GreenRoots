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
    <footer>
      <Link href="/">GreenRoots</Link>
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
