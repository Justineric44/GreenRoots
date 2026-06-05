import Title from '@/components/layout/Title';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOneTree, getTrees } from '@/lib/api';
import type { Tree } from '@/types/index';
import TreesCarousel from '@/components/layout/TreesCarousel';
import TreeQuantity from '@/components/layout/TreeQuantity';
import { cookies } from 'next/headers';

export default async function TreeDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [tree, treesData] = await Promise.allSettled([
    getOneTree(slug),
    getTrees(1),
  ]);

  if (tree.status === 'rejected' || !tree.value) return notFound();

  const treeData = tree.value;

  const stock = treeData.projects?.[0]?.stock ?? 0;

  const { trees: otherTrees = [] } =
    treesData.status === 'fulfilled' ? treesData.value : { trees: [] };

  const suggestions = (otherTrees as Tree[]).filter((t) => t.slug !== slug);

  // Prépare la liste des projets pour le composant
  const isLoggedIn = Boolean((await cookies()).get('token')?.value);

  const projectsForPurchase =
    treeData.projects?.map((pt: any) => ({
      id: pt.project.id,
      slug: pt.project.slug,
      name: pt.project.name,
      stock: pt.stock,
    })) ?? [];

  return (
    <main>
      <Title title={treeData.commonName} />

      <section className="bg-brand-dark px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-white">
          {/* IMPORTANT : items-stretch pour même hauteur */}
          <div className="flex flex-col lg:flex-row gap-12 items-stretch lg:h-[550px]">
            {/* IMAGE */}
            <div className="relative w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={treeData.picture}
                alt={treeData.commonName}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* BLOCK DROIT */}
            <div className="flex flex-col gap-4 lg:w-1/2 bg-brand-bg/5 rounded-2xl p-8 h-full justify-between">
              <div>
                <span className="bg-brand-accent text-white px-4 py-1 text-sm font-semibold rounded-md inline-block">
                  Origine : {treeData.origin}
                </span>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Famille de produits : {treeData.family}
              </p>

              <div>
                <h2 className="text-3xl font-bold">{treeData.commonName}</h2>
                <p className="text-sm italic text-muted-foreground">
                  {treeData.scientificName}
                </p>
              </div>

              <p className="text-4xl font-bold">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(treeData.price)}
                <span className="text-base font-normal text-muted-foreground">
                  {' '}
                  / arbre
                </span>
              </p>

              <p className="text-sm">
                <span className="border border-brand-accent text-brand-accent px-2 py-0.5 rounded text-xs font-semibold mr-2">
                  En stock
                </span>
                <span className="text-muted-foreground">
                  {stock} plants disponibles
                </span>
              </p>

              <p className="text-sm text-muted-foreground">
                Description : <br /> {treeData.shortDescription}
              </p>

              {/* PROJETS */}
              <TreeQuantity
                treeId={treeData.id}
                projects={projectsForPurchase}
                isLoggedIn={isLoggedIn}
              />

              <p className="text-xs text-muted-foreground">
                Réf. produit : {treeData.id}
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-12 bg-brand-bg text-brand-dark rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-4">
              Description &amp; caractéristiques
            </h3>

            <p className="text-sm text-muted-foreground">
              {treeData.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* CARROUSEL */}
      {suggestions.length > 0 && (
        <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl p-8">
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
