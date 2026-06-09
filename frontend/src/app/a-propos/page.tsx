import Image from 'next/image';
import Link from 'next/link';
import { Eye, MapPin, Sparkles } from 'lucide-react';

import Title from '@/components/layout/Title';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'À propos',
  description:
    'GreenRoots — notre mission : replanter la planète en rendant la reforestation accessible à tous.',
};

export default function AboutPage() {
  return (
    <main>
      <Title title="À propos" />
      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-12 text-brand-dark">
          {/* Intro */}
          <header className="text-center space-y-3">
            <h2 className="text-3xl font-bold">À propos de GreenRoots</h2>
            <p className="text-muted-foreground">
              GreenRoots est une boutique solidaire dédiée à la reforestation.
              En commandant chez nous, vous financez directement la plantation
              d&apos;arbres et soutenez des projets locaux et transparents.
            </p>
          </header>

          {/* Mission */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Notre mission</h3>
            <p className="text-muted-foreground">
              Nous croyons qu&apos;un petit geste de chacun peut avoir un grand
              impact. GreenRoots facilite la contribution à la restauration des
              écosystèmes en connectant des acheteurs responsables à des projets
              de reforestation certifiés.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <li className="rounded-2xl border border-border p-5 bg-card">
                <Eye className="size-8 text-primary mb-3" aria-hidden="true" />
                <h4 className="font-semibold mb-2 text-primary">
                  Transparence
                </h4>
                <p className="text-sm text-muted-foreground">
                  Suivi clair des projets.
                </p>
              </li>
              <li className="rounded-2xl border border-border p-5 bg-card">
                <MapPin
                  className="size-8 text-primary mb-3"
                  aria-hidden="true"
                />
                <h4 className="font-semibold mb-2 text-primary">
                  Impact local
                </h4>
                <p className="text-sm text-muted-foreground">
                  Soutien aux communautés.
                </p>
              </li>
              <li className="rounded-2xl border border-border p-5 bg-card">
                <Sparkles
                  className="size-8 text-primary mb-3"
                  aria-hidden="true"
                />
                <h4 className="font-semibold mb-2 text-primary">Qualité</h4>
                <p className="text-sm text-muted-foreground">
                  Sélection d&apos;essences adaptées.
                </p>
              </li>
            </ul>
          </section>

          {/* Comment ça marche — layout 2 colonnes */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Colonne gauche : texte */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Comment ça marche</h3>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>
                  Choisissez un arbre ou un projet sur notre boutique et passez
                  commande.
                </li>
                <li>
                  Une partie du montant finance la plantation et la maintenance
                  des arbres.
                </li>
                <li>
                  Nous fournissons des mises à jour et des preuves de plantation
                  lorsque disponibles.
                </li>
              </ol>
            </div>

            {/* Colonne droite : 3 images empilées et alignées */}
            <div className="grid grid-cols-1 gap-3">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/a-propos/aditya-sethia-kRtRPB3v9Ts-unsplash.jpg"
                  alt="Forêt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/a-propos/alexey-demidov-Z-5ctVlACa4-unsplash.jpg"
                  alt="Plantation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/a-propos/gregor-scheithauer-0uO6qhd6Bi8-unsplash.jpg"
                  alt="Arbres"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Équipe */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Notre équipe</h3>
            <p className="text-muted-foreground">
              Cinq passionnés, chacun veillant à un pilier essentiel de
              GreenRoots pour vous garantir une expérience fiable, sécurisée et
              utile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="rounded-2xl border border-border p-5 bg-card text-center">
                <p className="font-semibold">Camille</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responsable de l&apos;expérience visiteur
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5 bg-card text-center">
                <p className="font-semibold">Charly</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responsable sécurité &amp; comptes utilisateurs
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5 bg-card text-center">
                <p className="font-semibold">Justine</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responsable catalogue d&apos;arbres
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5 bg-card text-center">
                <p className="font-semibold">François</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responsable fiabilité &amp; conformité
                </p>
              </div>
              <div className="rounded-2xl border border-border p-5 bg-card text-center">
                <p className="font-semibold">Wafa</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Responsable espace client &amp; commandes
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-4">
            <p className="text-muted-foreground">
              Vous voulez en savoir plus ou devenir partenaire ?
            </p>
            <Link href="/contact" className="inline-block">
              <Button className="bg-accent">Nous contacter</Button>
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
