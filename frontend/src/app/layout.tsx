import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import TarteAuCitron from '@/components/layout/TarteAuCitron';
import { Inter, Montserrat } from 'next/font/google';
import '@/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Indexation pilotée par variable d'environnement.
// Permet d'autoriser l'indexation uniquement sur un vrai site de production,
// et de garder staging + déploiement de démo hors de l'index Google.
// (variable à définir côté Vercel : NEXT_PUBLIC_ALLOW_INDEXING=true/false)
const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export const metadata: Metadata = {
  // Titre en cascade : toutes les pages héritent du template du layout racine.
  title: {
    default: 'GreenRoots - Votre boutique pour la reforestation', // si une page ne définit pas de titre
    template: '%s - GreenRoots', // %s = le titre de la page enfant
  },
  // Description par défaut, héritée par les pages sans description propre.
  description:
    "GreenRoots est une boutique en ligne dédiée à la reforestation. En achetant chez nous, vous contribuez directement à la plantation d'arbres et à la préservation de notre planète.",
  // Balise <meta name="robots"> appliquée à tout le site.
  // index  : la page peut apparaître dans les résultats de recherche.
  // follow : les liens de la page peuvent être suivis par le crawler.
  // Ici piloté par l'environnement : tout passe en noindex hors prod réelle.
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isLoggedIn = Boolean((await cookies()).get('token')?.value);
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
        <TarteAuCitron />
      </body>
    </html>
  );
}
