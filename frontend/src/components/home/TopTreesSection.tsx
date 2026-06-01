// Section de la page d'accueil dédiée aux arbres les plus vendus.
// Elle reçoit une liste d'arbres depuis la page d'accueil et les affichera sous forme de cartes.

import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type TopTreesSectionProps = {
  trees: {
    id: number;
    commonName: string;
    family: string;
    origin: string;
    slug: string;
    picture: string;
    price: number;
  }[];
};

export default function TopTreesSection({ trees }: TopTreesSectionProps) {
  return (
    <section className="bg-brand-bg px-4 py-16 text-brand-dark sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Titre de la section arbres */}
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Les arbres les plus vendus
        </h2>

        {/* Cartes compactes des arbres les plus vendus */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trees.map((tree) => (
            <Card key={tree.id} className="bg-brand-white text-brand-dark">
              <div className="relative h-52 w-full">
                <Image
                  src={tree.picture}
                  alt={tree.commonName}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle>{tree.commonName}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-brand-muted">
                  Famille : {tree.family}
                </p>

                <p className="text-sm text-brand-muted">
                  Origine : {tree.origin}
                </p>

                <Badge className="bg-brand-accent text-brand-dark">
                  {tree.price} €
                </Badge>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/arbres/${tree.slug}`}>Voir l&aposarbre</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
