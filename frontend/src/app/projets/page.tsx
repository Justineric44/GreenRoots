import Title from '@/components/layout/Title';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProjectsPagination from '@/components/layout/ProjectsPagination';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';
import type { Project } from '@/types/index';
import { getProjects } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projets de reforestation - GreenRoots',
  description:
    "Découvrez nos projets de reforestation à travers le monde. Participez à la lutte contre le changement climatique en soutenant nos initiatives de plantation d'arbres.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Récupérer le numéro de page à partir des paramètres de recherche avec await pour s'assurer que les données sont disponibles avant de continuer
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 6;
  const { projects, total } = await getProjects(currentPage);
  if (!projects || projects.length === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(total / limit);
  console.log(totalPages);
  return (
    <main>
      <Title title="Nos projets" />
      <section className="bg-brand-bg px-4 py-4 sm:px-4 lg:px-4 lg:py-4">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark">
          <p className="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark flex flex-row flex-wrap gap-4">
          {projects.map((project: Project) => (
            <Card
              key={project.id}
              className="relative mx-auto w-full max-w-sm pt-0"
            >
              <div className="absolute inset-0 z-30 aspect-video" />
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 z-40"
              >
                {project.localisation}
              </Badge>
              <Image
                src={project.picture}
                alt={project.name}
                width={300}
                height={200}
                priority
                className="relative z-20 aspect-video w-full object-cover"
              />

              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="min-h-[3rem]">
                  {project.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full bg-accent">
                  <Link href={`/projets/${project.slug}`} className="w-full">
                    Voir le projet
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}

          <ProjectsPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </section>
    </main>
  );
}
