'use client';

// Carrousel des projets de la page d'accueil.
// Il affiche 4 projets à la fois, sans carte coupée, avec une navigation circulaire.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getImageUrl } from '@/lib/images';

type ProjectsCarouselProps = {
  projects: {
    id: number;
    name: string;
    shortDescription: string;
    slug: string;
    localisation: string;
    picture: string;
    progress: number;
  }[];
};

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (projects.length === 0) {
    return null;
  }

  // Sélectionne 4 projets visibles à partir de startIndex.
  // Le modulo permet de revenir au début une fois arrivé à la fin.
  const visibleProjects = Array.from({ length: 4 }, (_, index) => {
    return projects[(startIndex + index) % projects.length];
  });

  // Recule d'un projet, en revenant à la fin si on est au début.
  const handlePrevious = () => {
    setStartIndex((currentIndex) =>
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    );
  };

  // Avance d'un projet, en revenant au début si on est à la fin.
  const handleNext = () => {
    setStartIndex((currentIndex) =>
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-brand-dark px-4 py-16 text-brand-white sm:px-6 lg:px-8">
      {/* Blobs lumineux décoratifs */}
      <div className="pointer-events-none absolute -left-50 top-30 h-120 w-65 rounded-full bg-brand-accent/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Titre de la section projets */}
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Choisissez le projet que vous souhaitez soutenir
        </h2>

        <div className="relative mt-10">
          {/* Bouton gauche */}
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Projet précédent"
            className="absolute -left-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent text-2xl text-brand-white shadow transition hover:opacity-80"
          >
            ‹
          </button>

          {/* Grille des 4 projets visibles */}
          <div className="grid justify-center gap-6 sm:grid-cols-[repeat(2,18rem)] lg:grid-cols-[repeat(4,18rem)]">
            {visibleProjects.map((project) => (
              <Card
                key={project.id}
                className="flex h-[470px] w-72 bg-brand-white pt-0 text-brand-dark transition-shadow hover:shadow-lg"
              >
                {/* Image du projet */}
                <div className="relative h-48 w-full">
                  <Image
                    src={getImageUrl(project.picture)}
                    alt={project.name}
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </div>

                {/* Contenu principal du projet */}
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col space-y-4">
                  <p className="text-sm text-brand-muted">
                    {project.shortDescription}
                  </p>

                  <p className="text-sm font-medium">{project.localisation}</p>

                  {/* Bloc fixé en bas : progression + bouton */}
                  <div className="mt-auto space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span>Progression</span>
                        <span>{project.progress}%</span>
                      </div>

                      <Progress value={project.progress} />
                    </div>

                    <Button
                      asChild
                      className="w-full bg-brand-accent text-brand-dark hover:bg-brand-accent/80"
                    >
                      <Link href={`/projets/${project.slug}`}>
                        Voir le projet
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bouton droite */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Projet suivant"
            className="absolute -right-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent text-2xl text-brand-white shadow transition hover:opacity-80"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
