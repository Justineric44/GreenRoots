export interface ProjectSummary {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  localisation: string;
  picture: string;
  progress: number;
}

export interface Project extends ProjectSummary {
  longDescription: string;
  description: string;
  createdAt: string;
  trees?: []; // TODO: Ajouter le type arbre (voir Justine)
}
