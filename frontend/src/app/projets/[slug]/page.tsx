import { cookies } from 'next/headers';
import type { Tree } from '@/types/index';
import Title from '@/components/layout/Title';
import { getOneProject, getProjectTrees } from '@/lib/api';
import TreesCarousel from '@/components/layout/TreesCarousel';
import ProjectTreePurchase from '@/components/layout/ProjectTreePurchase';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ApiError } from '@/lib/errors';
import { getImageUrl } from '@/lib/images';

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

type ApiProjectTree = {
  id: number;
  commonName: string;
  slug: string;
  scientificName: string;
  shortDescription: string;
  price: string;
  picture: string;
  stock: number;
};

type ProjectTree = Tree & {
  // On convertit le prix en nombre pour l’utiliser plus simplement dans l’interface.
  stock: number;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailPageProps) {
  // Le slug du projet est récupéré depuis les paramètres de la route dynamique.
  const { slug } = await params;

  // On vérifie si un cookie de session est présent pour savoir si l’utilisateur est connecté.
  const isLoggedIn = Boolean((await cookies()).get('token')?.value);

  let project;

  try {
    // Récupération du projet demandé via l’API backend.
    // Si l’appel échoue, la page renvoie une 404 naturelle.
    project = await getOneProject(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    } else {
      // Pour les autres erreurs, on renvoit une 500.
      throw error;
    }
  }

  let trees: ProjectTree[] = [];

  try {
    // Récupération des arbres liés au projet, sur la première page de pagination.
    const treesResponse = await getProjectTrees(slug, 1);
    // On extrait le tableau des arbres depuis la réponse de l'API.
    // Conversion des arbres API en structure plus simple pour l’affichage front.
    // Le prix est transformé en nombre, car il arrive en chaîne depuis l’API.
    trees = treesResponse.trees.map((tree: ApiProjectTree) => ({
      ...tree,
      price: Number(tree.price),
    }));
  } catch (error) {
    console.error('[ProjectDetailsPage] Erreur récupération arbres :', error);
    // En cas d’erreur lors de la récupération des arbres, on continue d’afficher la page projet sans les arbres.
    trees = [];
  }

  const {
    name,
    localisation,
    shortDescription,
    longDescription,
    progress,
    picture,
  } = project;

  return (
    <main>
      <Title title={name} />

      {/* Section principale de présentation du projet et de ses détails. */}
      <section className="bg-brand-dark px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-white">
          <div className="flex flex-col items-stretch gap-12 lg:flex-row">
            {/* IMAGE PROJET */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 lg:w-1/2">
              <Image
                src={getImageUrl(picture)}
                alt={name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* CARTE INFOS PROJET */}
            <div className="flex flex-col gap-6 rounded-2xl bg-brand-bg/5 p-8 lg:w-1/2">
              <div>
                <span className="inline-block rounded-md bg-brand-accent px-4 py-1 text-sm font-semibold text-white">
                  Localisation : {localisation}
                </span>
              </div>

              <div>
                <h2 className="text-3xl font-bold">{name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {shortDescription}
                </p>
              </div>

              {/* Barre de progression du projet : elle montre le taux de financement atteint. */}
              <div className="max-w-4xl">
                <p className="mb-3 text-lg font-bold">{progress}% financé</p>

                <div className="relative pr-36">
                  <div className="relative h-16">
                    <div className="absolute top-5 h-4 w-full rounded-full bg-gray-300" />

                    <div
                      className="absolute top-5 h-4 rounded-full bg-brand-accent"
                      style={{ width: `${progress}%` }}
                    />

                    <Image
                      src="/images/projects/details/tree-progress.svg"
                      alt={`Icone d'arbre indiquant la progression actuelle du projet à ${progress}%`}
                      width={40}
                      height={40}
                      className="absolute -top-2 -translate-x-1/2"
                      style={{ left: `${progress}%` }}
                    />
                  </div>

                  <div className="absolute right-5 -top-5">
                    <Image
                      src="/images/projects/details/forest-goal.svg"
                      alt="Objectif de forêt - Symbole représentant le but de reforestation du projet"
                      width={110}
                      height={70}
                      className="h-auto w-[110px]"
                    />
                  </div>
                </div>

                <div className="-mt-5 flex justify-between pr-36 text-sm text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              <ProjectTreePurchase
                projectId={project.id}
                trees={trees}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="mt-12 bg-brand-bg text-brand-dark rounded-2xl p-8">
            <h3 className="text-lg font-bold mb-4">Description</h3>

            <p className="text-sm text-muted-foreground">{longDescription}</p>
          </div>
        </div>
      </section>

      {/* Section supplémentaire affichée uniquement si des arbres sont disponibles pour ce projet. */}
      {trees.length > 0 && (
        <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl p-8">
            <h2 className="mb-8 text-xl font-bold uppercase text-brand-dark">
              Arbres disponibles pour ce projet
            </h2>

            <TreesCarousel trees={trees} />
          </div>
        </section>
      )}
    </main>
  );
}
