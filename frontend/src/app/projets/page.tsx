import Title from '@/components/layout/Title';
import { Metadata } from 'next';
import ProjectsContent from '@/components/layout/ProjectsContent';
import { Suspense } from 'react';
import ProjectsSkeleton from '@/components/layout/ProjectsSkeleton';
import type { ProjectsSearchParams } from '@/types/index';

export const metadata: Metadata = {
  title: 'Projets de reforestation - GreenRoots',
  description:
    "Découvrez nos projets de reforestation à travers le monde. Participez à la lutte contre le changement climatique en soutenant nos initiatives de plantation d'arbres.",
};

const paragraph1 =
  "GreenRoots s'engage aux côtés de partenaires locaux pour financer et suivre des projets de reforestation à travers l'Europe et au-delà. Chaque projet est rigoureusement sélectionné selon des critères environnementaux stricts : choix d'essences indigènes adaptées au territoire, engagement des communautés locales, et suivi de la croissance des arbres sur le long terme. Nous croyons que la reforestation est l'un des leviers les plus puissants pour restaurer la biodiversité, protéger les sols et lutter efficacement contre le dérèglement climatique.";

const paragraph2 =
  "En choisissant de soutenir un projet sur notre plateforme, vous participez concrètement à la restauration d'écosystèmes fragilisés par la déforestation, les incendies ou l'agriculture intensive. Que ce soit en Bourgogne, en Provence ou dans les Vosges, chaque arbre planté contribue à reconstituer un couvert forestier essentiel pour la faune, la flore et les populations locales. Transparence, traçabilité et impact mesurable : GreenRoots vous donne les outils pour agir en toute confiance pour la planète.";

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
          <p className="pb-4">{paragraph1}</p>
          <p className="pb-4">{paragraph2}</p>
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
