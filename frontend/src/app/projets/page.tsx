import Title from '@/components/layout/Title';
import { Metadata } from 'next';
import ProjectsContent from '@/components/layout/ProjectsContent';
import { Suspense } from 'react';
import ProjectsSkeleton from '@/components/layout/ProjectsSkeleton';
import type { ProjectsSearchParams } from '@/types/index';

export const metadata: Metadata = {
  title: 'Nos projets de reforestation',
  description:
    "Découvrez nos projets de reforestation à travers le monde. Participez à la lutte contre le changement climatique en soutenant nos initiatives de plantation d'arbres.",
};

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: ProjectsSearchParams;
}) {
  return (
    <main>
      <Title title="Nos projets" />
      <section className="bg-brand-bg px-4 py-4 sm:px-4 lg:px-4 lg:py-2">
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
      <section className="bg-brand-bg px-4 pt-4 pb-16 sm:px-6 lg:px-8 lg:pt-4 lg:pb-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark">
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
