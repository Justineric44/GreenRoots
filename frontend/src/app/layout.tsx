import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'GreenRoots - Votre boutique pour la reforestation ',
  description:
    "GreenRoots est une boutique en ligne dédiée à la reforestation. En achetant chez nous, vous contribuez directement à la plantation d'arbres et à la préservation de notre planète. Découvrez nos arbres et rejoignez notre mission pour un avenir plus vert !",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
