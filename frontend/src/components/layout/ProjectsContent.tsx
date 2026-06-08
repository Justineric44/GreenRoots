import Image from 'next/image';
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
import type { Project } from '@/types/index';
import { getProjects, getProjectsLocalisations } from '@/lib/api';
import { Progress } from '@/components/ui/progress';
import { Field, FieldLabel } from '@/components/ui/field';
import type { ProjectsSearchParams } from '@/types/index';
import ProjectsFilters from '@/components/layout/ProjectsFilters';

interface ProjectsContentProps {
  searchParams: ProjectsSearchParams;
}
export default async function ProjectsContent({
  searchParams,
}: ProjectsContentProps) {
  // Récupérer le numéro de page à partir des paramètres de recherche avec await pour s'assurer que les données sont disponibles avant de continuer
  const { page, localisation, search, sortBy, sortOrder } = await searchParams;
  const currentPage = Number(page) || 1;
  const { projects, total, limit } = await getProjects(
    currentPage,
    localisation,
    search,
    sortBy,
    sortOrder
  );
  const { localisations } = await getProjectsLocalisations();
  const totalPages = Math.ceil(total / limit);
  return !projects || projects.length === 0 ? (
    <p className="text-center text-lg mt-10">
      Aucun projet ne correspond à votre recherche.
    </p>
  ) : (
    <>
      <ProjectsFilters localisations={localisations} />
      <div className="flex flex-row flex-wrap gap-4 mb-8">
        {projects.map((project: Project) => (
          <Card
            key={project.id}
            className="relative mx-auto w-full max-w-sm pt-0"
          >
            <div className="absolute inset-0 z-30 aspect-video" />
            <Badge variant="secondary" className="absolute top-2 right-2 z-40">
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

              <Field className="w-full max-w-sm">
                <FieldLabel htmlFor="progress-upload">
                  <span>Progression</span>
                  <span className="ml-auto">{project.progress}%</span>
                </FieldLabel>
                <Progress
                  value={project.progress}
                  id="progress-upload"
                  className="w-full"
                />
              </Field>
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
      </div>

      <ProjectsPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
