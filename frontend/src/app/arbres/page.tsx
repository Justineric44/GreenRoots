import Title from '@/components/layout/Title';
import { Metadata } from 'next';
import type { TreesSearchParams } from '@/types/index';
import { Suspense } from 'react';
import TreesContent from '@/components/layout/TreesContent';
import TreesSkeleton from '@/components/layout/TreesSkeleton';

export const metadata: Metadata = {
  title: 'Nos arbres - GreenRoots',
  description:
    "Découvrez notre sélection d'arbres à planter à travers le monde. Participez à la reforestation en choisissant l'arbre qui vous correspond.",
};

export default async function TreesPage({
  searchParams,
}: {
  searchParams: TreesSearchParams;
}) {
  return (
    <main>
      <Title title="Nos arbres" />
      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark">
          {/*
            Suspense est utilisé ici pour retarder l'affichage du contenu des arbres
            tant que les données nécessaires ne sont pas encore prêtes.
            Pendant le chargement, nous affichons un squelette de chargement.
          */}
          <Suspense fallback={<TreesSkeleton />}>
            <TreesContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
