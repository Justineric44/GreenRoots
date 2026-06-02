import Image from 'next/image';

import { getProjects, getTrees } from '@/lib/api';
import ProjectsCarousel from '@/components/home/ProjectsCarousel';
import TopTreesSection from '@/components/home/TopTreesSection';
import ImpactSection from '@/components/home/ImpactSection';
import MissionSection from '@/components/home/MissionSection';
import CompletedProjectsSection from '@/components/home/CompletedProjectsSection';

export default async function HomePage() {
  // Récupération des projets depuis l'API backend.
  // La page d'accueil affiche les premiers projets disponibles.
  const { projects } = await getProjects(1);
  // Récupération des arbres depuis l'API backend.
  // On gardera les 3 premiers pour la section "arbres les plus vendus".
  const { trees } = await getTrees(1);
  const topTrees = trees.slice(0, 3);
  return (
    <main className="min-h-screen bg-brand-bg text-brand-dark">
      <section className="relative isolate min-h-[680px] overflow-hidden px-4 py-24 text-brand-white sm:px-6 lg:px-8 lg:py-28">
        <Image
          src="/images/background-image-main.jpg"
          alt="Forêt et reforestation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 via-70% to-brand-dark" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center pt-20">
          <h1 className="max-w-5xl text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Plantez un arbre
            <br />
            avec GreenRoots
          </h1>
          <p className="mt-10 max-w-2xl text-lg font-semibold leading-7 text-brand-white sm:text-2xl">
            Choisissez un arbre, contribuez a la reforestation, suivez votre
            impact !
          </p>
        </div>
      </section>

      <ProjectsCarousel projects={projects} />
      <MissionSection />
      <TopTreesSection trees={topTrees} />
      <CompletedProjectsSection />
      <ImpactSection />
    </main>
  );
}
