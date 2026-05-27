import type { Metadata } from 'next';
import './globals.css';

// import des Header et Footer
//import Header from "@/components/Header";
//import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'GreenRoots - Votre boutique pour la reforestation ',
  description:
    "GreenRoots est une boutique en ligne dédiée à la reforestation. En achetant chez nous, vous contribuez directement à la plantation d'arbres et à la préservation de notre planète. Découvrez nos arbres et rejoignez notre mission pour un avenir plus vert !",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-full flex flex-col">
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
