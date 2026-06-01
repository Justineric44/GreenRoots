import Title from '@/components/layout/Title';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOneTree, getTrees } from '@/lib/api';
import type { Tree } from '@/types/index';
import TreesCarousel from '@/components/layout/TreesCarousel';
import TreeQuantity from '@/components/layout/TreeQuantity';

export default async function TreeDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tree = await getOneTree(slug).catch(() => null);

  if (!tree) return notFound();

  const { trees: otherTrees } = await getTrees(1).catch(() => ({ trees: [] }));
  const suggestions = (otherTrees as Tree[]).filter((t) => t.slug !== slug);

  return (
    <main>
      <Title title={tree.commonName} />

      {/* ── Détail ── */}
      <section className="bg-brand-dark px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-white">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image gauche */}
            <div className="relative w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={tree.picture}
                alt={tree.commonName}
                fill
                className="object-cover"
              />
            </div>

            {/* Infos droite */}
            <div className="flex flex-col gap-4 lg:w-1/2">
              {/* Origine */}
              <div>
                <span className="bg-brand-accent text-white px-4 py-1 text-sm font-semibold rounded-md inline-block">
                  Origine : {tree.origin}
                </span>
              </div>

              {/* Famille */}
              <p className="text-sm text-muted-foreground italic">
                Famille de produits : {tree.family}
              </p>

              {/* Nom */}
              <div>
                <h2 className="text-3xl font-bold">{tree.commonName}</h2>
                <p className="text-sm italic text-muted-foreground">
                  {tree.scientificName}
                </p>
              </div>

              {/* Prix */}
              <p className="text-4xl font-bold">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(tree.price)}
                <span className="text-base font-normal text-muted-foreground">
                  {' '}
                  / arbre
                </span>
              </p>

              {/* Stock */}
              <p className="text-sm">
                <span className="border border-brand-accent text-brand-accent px-2 py-0.5 rounded text-xs font-semibold mr-2">
                  En stock
                </span>
                <span className="text-muted-foreground">
                  {' '}
                  5 plants disponibles
                </span>
              </p>

              {/* Description courte */}
              <p className="text-sm text-muted-foreground">
                {tree.shortDescription}
              </p>

              {/* Choisir le projet */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font">Choisir le projet</p>
                <select className="bg-brand-bg text-brand-dark px-4 py-1 text-sm font rounded-md border-0 w-48">
                  <option>Projet 1</option>
                </select>
              </div>

              {/* Quantité + panier */}
              <TreeQuantity />

              <p className="text-xs text-muted-foreground">
                Réf. produit : {tree.id}
              </p>
            </div>
          </div>

          {/* Description & caractéristiques */}
          <div className="mt-12 bg-brand-bg text-brand-dark rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-4">
              Description &amp; caractéristiques
            </h3>
            <p className="text-sm text-muted-foreground">
              {tree.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── Autres arbres ── */}
      {suggestions.length > 0 && (
        <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="w-full p-8">
            <h2 className="text-xl font-bold uppercase mb-8 text-brand-dark">
              Sélection d&apos;autres arbres
            </h2>
            <TreesCarousel trees={suggestions} />
          </div>
        </section>
      )}
    </main>
  );
}
