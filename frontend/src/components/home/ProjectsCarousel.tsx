'use client';

// Composant carrousel de la page d'accueil.
// Il affichera les projets de reforestation sous forme de cartes défilantes.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type FeaturedProjectsProps = {
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

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (projects.length === 0) {
    return null;
  }

  const visibleProjects = [
    projects[startIndex],
    projects[(startIndex + 1) % projects.length],
    projects[(startIndex + 2) % projects.length],
  ].filter(Boolean);

  const handlePrevious = () => {
    setStartIndex((currentIndex) =>
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((currentIndex) =>
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-brand-dark px-4 py-16 text-brand-white sm:px-6 lg:px-8">
      {/* Blobs lumineux décoratifs inspirés du site de référence */}
      <div className="pointer-events-none absolute -left-50 top-35 h-80 w-55 rounded-full bg-brand-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-95 w-50 rounded-full bg-brand-accent/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Choisissez le projet que vous souhaitez soutenir
        </h2>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Projet précédent"
            className="absolute -left-16 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-white/30 bg-brand-white text-2xl font-bold text-brand-dark shadow-lg transition hover:scale-105 hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            ‹
          </button>

          <div className="grid gap-6 md:grid-cols-3">
            {visibleProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden bg-brand-white text-brand-dark"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={project.picture}
                    alt={project.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-brand-muted">
                    {project.shortDescription}
                  </p>

                  <p className="text-sm font-medium">{project.localisation}</p>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>

                    <Progress value={project.progress} />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/projets/${project.slug}`}>
                      Voir le projet
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Projet suivant"
            className="absolute -right-16 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-white/30 bg-brand-white text-2xl font-bold text-brand-dark shadow-lg transition hover:scale-105 hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
