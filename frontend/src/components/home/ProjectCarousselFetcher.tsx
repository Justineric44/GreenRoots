import { getProjects } from '@/lib/api';
import ProjectsCarousel from './ProjectsCarousel';

export async function ProjectsCarouselFetcher() {
  // Récupération des projets depuis l'API backend.
  // La page d'accueil les utilise dans le carrousel des projets.

  const { projects } = await getProjects();
  return <ProjectsCarousel projects={projects} />;
}
