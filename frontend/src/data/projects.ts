export type Project = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  localisation: string;
  picture: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export const projects: Project[] = [
  {
    id: 1,
    name: 'Reforestation Amazonie',
    slug: 'reforestation-amazonie',
    shortDescription:
      "Replantation d'espèces indigènes dans les zones déboisées du bassin amazonien.",
    localisation: 'Brésil',
    picture:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
    progress: 72,
    createdAt: '2024-01-15T08:00:00.000Z',
    updatedAt: '2025-03-10T14:30:00.000Z',
  },
  {
    id: 2,
    name: 'Forêt de Mangroves Kenya',
    slug: 'foret-mangroves-kenya',
    shortDescription:
      'Restauration des mangroves côtières pour protéger la biodiversité marine et les communautés locales.',
    localisation: 'Kenya',
    picture:
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800',
    progress: 45,
    createdAt: '2024-02-20T09:00:00.000Z',
    updatedAt: '2025-04-01T11:00:00.000Z',
  },
  {
    id: 3,
    name: 'Corridor Vert Borneo',
    slug: 'corridor-vert-borneo',
    shortDescription:
      "Création d'un corridor forestier pour relier des zones de forêt primaire fragmentées.",
    localisation: 'Indonésie',
    picture:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    progress: 30,
    createdAt: '2024-03-05T07:30:00.000Z',
    updatedAt: '2025-02-14T16:00:00.000Z',
  },
  {
    id: 4,
    name: 'Reboisement Atlas Marocain',
    slug: 'reboisement-atlas-marocain',
    shortDescription:
      'Plantation de cèdres et chênes verts pour lutter contre la désertification dans le Haut Atlas.',
    localisation: 'Maroc',
    picture:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    progress: 88,
    createdAt: '2023-11-10T10:00:00.000Z',
    updatedAt: '2025-05-01T09:00:00.000Z',
  },
  {
    id: 5,
    name: 'Savane Boisée Tanzanie',
    slug: 'savane-boisee-tanzanie',
    shortDescription:
      "Restauration d'acacias et baobabs dans les zones dégradées du parc national de Serengeti.",
    localisation: 'Tanzanie',
    picture:
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
    progress: 55,
    createdAt: '2024-04-12T08:00:00.000Z',
    updatedAt: '2025-03-28T13:45:00.000Z',
  },
  {
    id: 6,
    name: 'Taïga Sibérienne',
    slug: 'taiga-siberienne',
    shortDescription:
      'Replantation de pins et bouleaux dans les zones ravagées par des incendies en Sibérie orientale.',
    localisation: 'Russie',
    picture: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    progress: 20,
    createdAt: '2024-06-01T06:00:00.000Z',
    updatedAt: '2025-01-15T10:00:00.000Z',
  },
  {
    id: 7,
    name: 'Forêt Nuageuse Colombie',
    slug: 'foret-nuageuse-colombie',
    shortDescription:
      'Protection et extension des forêts nuageuses andines, habitat de nombreuses espèces endémiques.',
    localisation: 'Colombie',
    picture:
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800',
    progress: 63,
    createdAt: '2024-01-28T09:00:00.000Z',
    updatedAt: '2025-04-20T15:00:00.000Z',
  },
  {
    id: 8,
    name: 'Bocage Normand',
    slug: 'bocage-normand',
    shortDescription:
      "Replantation de haies bocagères en Normandie pour restaurer la biodiversité et limiter l'érosion.",
    localisation: 'France',
    picture:
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800',
    progress: 91,
    createdAt: '2023-09-01T07:00:00.000Z',
    updatedAt: '2025-05-10T08:30:00.000Z',
  },
  {
    id: 9,
    name: 'Pinède Méditerranéenne',
    slug: 'pinede-mediterraneenne',
    shortDescription:
      'Reboisement post-incendie en Provence avec des essences résistantes à la sécheresse.',
    localisation: 'France',
    picture:
      'https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=800',
    progress: 47,
    createdAt: '2024-05-15T08:00:00.000Z',
    updatedAt: '2025-03-05T12:00:00.000Z',
  },
  {
    id: 10,
    name: 'Forêt Côtière Mozambique',
    slug: 'foret-cotiere-mozambique',
    shortDescription:
      "Replantation d'espèces côtières pour stabiliser les sols et protéger les villages du littoral.",
    localisation: 'Mozambique',
    picture:
      'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800',
    progress: 38,
    createdAt: '2024-07-20T08:00:00.000Z',
    updatedAt: '2025-02-28T14:00:00.000Z',
  },
  {
    id: 11,
    name: 'Chênaie Ibérique',
    slug: 'chenaie-iberique',
    shortDescription:
      'Restauration de chênaies endémiques dans la péninsule ibérique, habitat du lynx ibérique.',
    localisation: 'Espagne',
    picture:
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800',
    progress: 76,
    createdAt: '2023-12-01T10:00:00.000Z',
    updatedAt: '2025-04-15T09:00:00.000Z',
  },
  {
    id: 12,
    name: 'Forêt Tropicale Madagascar',
    slug: 'foret-tropicale-madagascar',
    shortDescription:
      "Reboisement d'espèces endémiques pour contrer la déforestation massive à Madagascar.",
    localisation: 'Madagascar',
    picture: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    progress: 53,
    createdAt: '2024-02-10T07:30:00.000Z',
    updatedAt: '2025-05-05T11:30:00.000Z',
  },
  {
    id: 13,
    name: 'Ceinture Verte Sahel',
    slug: 'ceinture-verte-sahel',
    shortDescription:
      "Plantation d'arbres résistants à la chaleur pour freiner l'avancée du désert au Sahel.",
    localisation: 'Sénégal',
    picture:
      'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800',
    progress: 61,
    createdAt: '2023-10-15T08:00:00.000Z',
    updatedAt: '2025-03-18T10:00:00.000Z',
  },
  {
    id: 14,
    name: 'Jungle Urbaine Singapour',
    slug: 'jungle-urbaine-singapour',
    shortDescription:
      "Intégration d'espèces tropicales indigènes dans le tissu urbain pour réduire les îlots de chaleur.",
    localisation: 'Singapour',
    picture:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800',
    progress: 84,
    createdAt: '2024-03-22T09:00:00.000Z',
    updatedAt: '2025-04-30T16:00:00.000Z',
  },
  {
    id: 15,
    name: 'Forêt Boréale Finlande',
    slug: 'foret-boreale-finlande',
    shortDescription:
      'Diversification des essences dans les forêts boréales finlandaises pour renforcer leur résilience climatique.',
    localisation: 'Finlande',
    picture:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
    progress: 42,
    createdAt: '2024-08-05T07:00:00.000Z',
    updatedAt: '2025-02-10T09:30:00.000Z',
  },
  {
    id: 16,
    name: 'Yungas Boliviennes',
    slug: 'yungas-boliviennes',
    shortDescription:
      "Restauration des forêts de transition entre les Andes et l'Amazonie en Bolivie.",
    localisation: 'Bolivie',
    picture:
      'https://images.unsplash.com/photo-1504870712357-65ea720d6078?w=800',
    progress: 27,
    createdAt: '2024-09-10T08:00:00.000Z',
    updatedAt: '2025-01-20T13:00:00.000Z',
  },
  {
    id: 17,
    name: 'Forêt de Mousson Inde',
    slug: 'foret-mousson-inde',
    shortDescription:
      "Reboisement dans les zones désertifiées du Rajasthan en s'appuyant sur les savoirs locaux.",
    localisation: 'Inde',
    picture:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    progress: 69,
    createdAt: '2024-01-05T06:30:00.000Z',
    updatedAt: '2025-04-08T12:00:00.000Z',
  },
  {
    id: 18,
    name: 'Bois de Galerie Cameroun',
    slug: 'bois-de-galerie-cameroun',
    shortDescription:
      "Replantation d'arbres le long des cours d'eau pour protéger les berges et la faune aquatique.",
    localisation: 'Cameroun',
    picture:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
    progress: 50,
    createdAt: '2024-04-30T08:00:00.000Z',
    updatedAt: '2025-03-22T10:30:00.000Z',
  },
  {
    id: 19,
    name: 'Séquoias Californiens',
    slug: 'sequoias-californiens',
    shortDescription:
      'Programme de replantation de séquoias géants dans les zones brûlées de Californie.',
    localisation: 'États-Unis',
    picture:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    progress: 35,
    createdAt: '2024-05-20T07:00:00.000Z',
    updatedAt: '2025-02-05T15:00:00.000Z',
  },
  {
    id: 20,
    name: 'Araucarias Patagonie',
    slug: 'araucarias-patagonie',
    shortDescription:
      "Préservation et extension des forêts d'araucarias millénaires en Patagonie chilienne.",
    localisation: 'Chili',
    picture:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    progress: 58,
    createdAt: '2024-06-15T09:00:00.000Z',
    updatedAt: '2025-04-25T11:00:00.000Z',
  },
];
