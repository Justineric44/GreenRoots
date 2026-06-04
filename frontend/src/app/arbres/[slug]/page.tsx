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

  const totalStock =
    treeData.projects?.reduce(
      (sum: number, pt: any) => sum + (pt.stock ?? 0),
      0
    ) ?? 0;

  const { trees: otherTrees = [] } =
    treesData.status === 'fulfilled' ? treesData.value : { trees: [] };

  const suggestions = (otherTrees as Tree[]).filter((t) => t.slug !== slug);

  const isLoggedIn = Boolean((await cookies()).get('token')?.value);

  const projectsForPurchase =
    treeData.projects
      ?.filter((pt: any) => pt.stock > 0)
      .map((pt: any) => ({
        id: pt.project.id,
        slug: pt.project.slug,
        name: pt.project.name,
        stock: pt.stock,
      })) ?? [];

  const allProjects =
    treeData.projects?.map((pt: any) => ({
      id: pt.project.id,
      name: pt.project.name,
      stock: pt.stock,
    })) ?? [];

  return (
    <main>
      <Title title={treeData.commonName} />

      <section className="bg-brand-dark px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-white">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch lg:h-[550px]">
            {/* IMAGE */}
            <div className="relative w-full lg:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={treeData.picture}
                alt={treeData.commonName}
                fill
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

              {/* PROJETS / STOCK */}
              <div className="text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Projets / Stock
                </p>
                <div className="flex flex-col gap-1">
                  {allProjects.length > 0 ? (
                    allProjects.map(
                      (pt: { id: number; name: string; stock: number }) => (
                        <div
                          key={pt.id}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">
                            {pt.name}
                          </span>
                          <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                            {pt.stock} plants
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-muted-foreground text-xs">
                      Aucun projet associé
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 border-t border-brand-bg/20 pt-1">
                    Total : {totalStock} plants
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Description : <br /> {treeData.shortDescription}
              </p>

              {/* ACHAT */}
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
