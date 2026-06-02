import Title from '@/components/layout/Title';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TreesPagination from '@/components/layout/TreesPagination';
import TreesFilters from '@/components/layout/TreesFilters';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';
import type { Tree } from '@/types/index';
import { getTrees } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Nos arbres - GreenRoots',
  description:
    "Découvrez notre sélection d'arbres à planter à travers le monde. Participez à la reforestation en choisissant l'arbre qui vous correspond.",
};

export default async function TreesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}) {
  const { page, search, minPrice, maxPrice, sortBy, sortOrder } =
    await searchParams;
  const currentPage = Number(page) || 1;
  const { trees, total, limit } = await getTrees(currentPage, {
    search,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <main>
      <Title title="Nos arbres" />
      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark">
          <TreesFilters />

          {!trees || trees.length === 0 ? (
            <p className="text-center text-lg mt-10">
              Aucun arbre ne correspond à votre recherche.
            </p>
          ) : (
            <>
              <div className="flex flex-row flex-wrap gap-4">
                {trees.map((tree: Tree) => (
                  <Card
                    key={tree.id}
                    className="relative mx-auto w-full max-w-sm pt-0"
                  >
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2 z-40"
                    >
                      {tree.origin}
                    </Badge>
                    <Image
                      src={tree.picture}
                      alt={tree.commonName}
                      width={300}
                      height={200}
                      priority
                      className="relative z-20 aspect-video w-full object-cover"
                    />
                    <CardHeader className="text-center">
                      <CardTitle>{tree.commonName}</CardTitle>
                      <CardDescription className="min-h-[3rem] italic text-center">
                        {tree.family}
                      </CardDescription>
                      <p className="text-2xl font-bold text-brand-dark text-center">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        }).format(tree.price)}
                      </p>
                    </CardHeader>
                    <CardFooter>
                      <Button className="w-full bg-accent">
                        <Link href={`/arbres/${tree.slug}`} className="w-full">
                          Voir l&apos;arbre
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <TreesPagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
