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

export interface Tree {
  id: number;
  commonName: string;
  scientificName?: string;
  family: string;
  origin: string;
  slug: string;
  picture: string;
  price: number;
  shortDescription?: string;
  longDescription?: string;
}
