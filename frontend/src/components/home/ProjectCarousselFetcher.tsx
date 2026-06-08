import { getProjects } from '@/lib/api';
import ProjectsCarousel from './ProjectsCarousel';

export async function ProjectsCarouselFetcher() {
  // Récupération des projets depuis l'API backend.
  // La page d'accueil les utilise dans le carrousel des projets.
  await new Promise((resolve) => setTimeout(resolve, 2000)); // ← 2s de délai

  const { projects } = await getProjects();
  return <ProjectsCarousel projects={projects} />;
}
