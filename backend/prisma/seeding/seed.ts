import { UserRole, UserType, CartStatus, OrderStatus } from '@prisma/client';

import { prisma } from '../../src/lib/prisma.js';

import argon2 from 'argon2';

async function main() {
  console.log('🌱 Début du seeding GreenRoots...');

  // =========================================================
  // NETTOYAGE
  // =========================================================

  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.projectHasTree.deleteMany(),
    prisma.project.deleteMany(),
    prisma.tree.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('🧹 Base de données nettoyée');

  // =========================================================
  // USERS
  // =========================================================

  const passwordHash = await argon2.hash('password123');

  const adminUser = await prisma.user.create({
    data: {
      lastName: 'Dupont',
      firstName: 'Marie',
      email: 'admin@greenroots.fr',
      password: passwordHash,
      role: UserRole.admin,
      address: '12 rue de la Forêt',
      postalCode: '75001',
      city: 'Paris',
      type: UserType.association,
      phone: '0601020304',
    },
  });

  console.log(adminUser.email);
  //adminUser n'est pas utilisé ici car n'est nécessaire que pour le backoffice
  //Le console log permet d'utiliser la variable adminUser dans l'attente du backoffice

  const user1 = await prisma.user.create({
    data: {
      lastName: 'Martin',
      firstName: 'Thomas',
      email: 'thomas.martin@email.fr',
      password: passwordHash,
      role: UserRole.user,
      address: '45 avenue des Chênes',
      postalCode: '69001',
      city: 'Lyon',
      type: UserType.particulier,
      phone: '0612345678',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      lastName: 'Bernard',
      firstName: 'Sophie',
      email: 'sophie.bernard@email.fr',
      password: passwordHash,
      role: UserRole.user,
      address: '8 boulevard Verdure',
      postalCode: '33000',
      city: 'Bordeaux',
      type: UserType.particulier,
      phone: '0623456789',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      lastName: 'Leroy',
      firstName: 'Jean',
      email: 'contact@ecoentreprise.fr',
      password: passwordHash,
      role: UserRole.user,
      address: "100 rue de l'Industrie",
      postalCode: '67000',
      city: 'Strasbourg',
      type: UserType.entreprise,
      siret: '12345678901234',
      companyName: 'EcoEntreprise SAS',
      phone: '0634567890',
    },
  });

  console.log('👤 Utilisateurs créés');

  // =========================================================
  // TREES
  // =========================================================

  const chene = await prisma.tree.create({
    data: {
      commonName: 'Chêne sessile',
      slug: 'chene-sessile',
      scientificName: 'Quercus petraea',
      family: 'Fagaceae',
      shortDescription: 'Arbre robuste adapté aux forêts tempérées.',
      longDescription:
        'Le chêne sessile est apprécié pour sa longévité, sa résistance et son rôle important dans la biodiversité forestière.',
      origin: 'Europe',
      price: 12.9,
      picture: '/images/trees/chene-sessile.jpg',
    },
  });

  const pin = await prisma.tree.create({
    data: {
      commonName: 'Pin sylvestre',
      slug: 'pin-sylvestre',
      scientificName: 'Pinus sylvestris',
      family: 'Pinaceae',
      shortDescription: 'Conifère résistant adapté aux sols pauvres.',
      longDescription:
        'Le pin sylvestre est une essence pionnière capable de se développer dans des conditions difficiles.',
      origin: 'Europe et Asie',
      price: 8.9,
      picture: '/images/trees/pin-sylvestre.jpg',
    },
  });

  const bouleau = await prisma.tree.create({
    data: {
      commonName: 'Bouleau blanc',
      slug: 'bouleau-blanc',
      scientificName: 'Betula pendula',
      family: 'Betulaceae',
      shortDescription:
        'Arbre léger et pionnier, utile pour régénérer les sols.',
      longDescription:
        'Le bouleau blanc favorise la régénération naturelle et s’adapte bien aux climats tempérés.',
      origin: 'Europe',
      price: 7.5,
      picture: '/images/trees/bouleau-blanc.jpg',
    },
  });

  const acajou = await prisma.tree.create({
    data: {
      commonName: "Acajou d'Afrique",
      slug: 'acajou-afrique',
      scientificName: 'Khaya senegalensis',
      family: 'Meliaceae',
      shortDescription:
        'Essence tropicale adaptée aux projets de reforestation chaude.',
      longDescription:
        'L’acajou d’Afrique est utilisé dans certains projets de restauration écologique en zones chaudes.',
      origin: 'Afrique',
      price: 18,
      picture: '/images/trees/acajou-afrique.jpg',
    },
  });

  const sequoia = await prisma.tree.create({
    data: {
      commonName: 'Séquoia géant',
      slug: 'sequoia-geant',
      scientificName: 'Sequoiadendron giganteum',
      family: 'Cupressaceae',
      shortDescription:
        'Arbre majestueux à forte valeur écologique et symbolique.',
      longDescription:
        'Le séquoia géant est reconnu pour sa longévité exceptionnelle et sa capacité de stockage du carbone.',
      origin: 'Amérique du Nord',
      price: 25,
      picture: '/images/trees/sequoia-geant.jpg',
    },
  });

  const mangrove = await prisma.tree.create({
    data: {
      commonName: 'Palétuvier rouge',
      slug: 'paletuvier-rouge',
      scientificName: 'Rhizophora mangle',
      family: 'Rhizophoraceae',
      shortDescription:
        'Essence essentielle pour la restauration des mangroves.',
      longDescription:
        'Le palétuvier rouge protège les littoraux, favorise la biodiversité et limite l’érosion côtière.',
      origin: 'Zones tropicales',
      price: 15,
      picture: '/images/trees/paletuvier-rouge.jpg',
    },
  });

  console.log('🌳 Arbres créés');

  // =========================================================
  // PROJECTS
  // =========================================================

  const projetBretagne = await prisma.project.create({
    data: {
      name: 'Reforestation en Bretagne',
      slug: 'reforestation-bretagne',
      shortDescription: 'Projet de restauration forestière locale en Bretagne.',
      longDescription:
        'Ce projet vise à restaurer des zones forestières fragilisées en plantant des essences locales adaptées au climat breton.',
      localisation: 'Bretagne, France',
      picture: '/images/projects/reforestation-bretagne.jpg',
      progress: 45,
    },
  });

  const projetSahel = await prisma.project.create({
    data: {
      name: 'Reboisement au Sahel',
      slug: 'reboisement-sahel',
      shortDescription: 'Projet de reboisement en zone sèche.',
      longDescription:
        'Ce projet contribue à lutter contre la désertification grâce à la plantation d’essences adaptées aux zones arides.',
      localisation: 'Sahel',
      picture: '/images/projects/reboisement-sahel.jpg',
      progress: 30,
    },
  });

  const projetAlpes = await prisma.project.create({
    data: {
      name: 'Restauration forestière dans les Alpes',
      slug: 'restauration-forestiere-alpes',
      shortDescription: 'Projet de reforestation en zone montagneuse.',
      longDescription:
        'Ce projet vise à renforcer les écosystèmes forestiers alpins et à protéger les sols contre l’érosion.',
      localisation: 'Alpes, France',
      picture: '/images/projects/restauration-alpes.jpg',
      progress: 60,
    },
  });

  const projetAmazonie = await prisma.project.create({
    data: {
      name: 'Préservation en Amazonie',
      slug: 'preservation-amazonie',
      shortDescription:
        'Projet de plantation et restauration en zone tropicale.',
      longDescription:
        'Ce projet contribue à la restauration d’espaces naturels dégradés et au maintien de la biodiversité amazonienne.',
      localisation: 'Amazonie',
      picture: '/images/projects/preservation-amazonie.jpg',
      progress: 25,
    },
  });

  const projetMangrove = await prisma.project.create({
    data: {
      name: 'Restauration des mangroves',
      slug: 'restauration-mangroves',
      shortDescription: 'Projet de restauration écologique des zones côtières.',
      longDescription:
        'Ce projet vise à restaurer les mangroves afin de protéger les littoraux et favoriser la biodiversité marine.',
      localisation: 'Zones côtières tropicales',
      picture: '/images/projects/restauration-mangroves.jpg',
      progress: 70,
    },
  });

  console.log('🌍 Projets créés');

  // =========================================================
  // PROJECT_HAS_TREE
  // =========================================================

  await prisma.projectHasTree.createMany({
    data: [
      { projectId: projetBretagne.id, treeId: chene.id, stock: 500 },
      { projectId: projetBretagne.id, treeId: bouleau.id, stock: 300 },
      { projectId: projetBretagne.id, treeId: pin.id, stock: 200 },

      { projectId: projetSahel.id, treeId: acajou.id, stock: 1000 },
      { projectId: projetSahel.id, treeId: bouleau.id, stock: 400 },

      { projectId: projetAlpes.id, treeId: pin.id, stock: 800 },
      { projectId: projetAlpes.id, treeId: sequoia.id, stock: 150 },
      { projectId: projetAlpes.id, treeId: chene.id, stock: 350 },

      { projectId: projetAmazonie.id, treeId: acajou.id, stock: 2000 },
      { projectId: projetAmazonie.id, treeId: sequoia.id, stock: 50 },

      { projectId: projetMangrove.id, treeId: mangrove.id, stock: 3000 },
    ],
  });

  console.log('🔗 Associations projet-arbre créées');

  // =========================================================
  // CARTS
  // =========================================================

  await prisma.cart.create({
    data: {
      userId: user1.id,
      status: CartStatus.active,
      items: {
        create: [
          { treeId: chene.id, projectId: projetBretagne.id, quantity: 3 },
          { treeId: sequoia.id, projectId: projetAlpes.id, quantity: 1 },
        ],
      },
    },
  });

  await prisma.cart.create({
    data: {
      userId: user2.id,
      status: CartStatus.active,
      items: {
        create: [
          { treeId: mangrove.id, projectId: projetMangrove.id, quantity: 5 },
        ],
      },
    },
  });

  const cartThomasConverti = await prisma.cart.create({
    data: {
      userId: user1.id,
      status: CartStatus.converted,
      items: {
        create: [
          { treeId: bouleau.id, projectId: projetBretagne.id, quantity: 2 },
          { treeId: acajou.id, projectId: projetSahel.id, quantity: 1 },
        ],
      },
    },
  });

  const cartEntreprise = await prisma.cart.create({
    data: {
      userId: user3.id,
      status: CartStatus.converted,
      items: {
        create: [
          { treeId: pin.id, projectId: projetAlpes.id, quantity: 50 },
          { treeId: acajou.id, projectId: projetAmazonie.id, quantity: 20 },
          { treeId: sequoia.id, projectId: projetAlpes.id, quantity: 5 },
        ],
      },
    },
  });

  console.log('🛒 Paniers créés');

  // =========================================================
  // ORDERS
  // =========================================================

  await prisma.order.create({
    data: {
      userId: user1.id,
      cartId: cartThomasConverti.id,
      status: OrderStatus.validated,
      amount: 33,
      items: {
        create: [
          {
            treeId: bouleau.id,
            projectId: projetBretagne.id,
            treeCommonName: 'Bouleau blanc',
            quantity: 2,
            unitPrice: 7.5,
          },
          {
            treeId: acajou.id,
            projectId: projetSahel.id,
            treeCommonName: "Acajou d'Afrique",
            quantity: 1,
            unitPrice: 18,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: user3.id,
      cartId: cartEntreprise.id,
      status: OrderStatus.validated,
      amount: 930,
      items: {
        create: [
          {
            treeId: pin.id,
            projectId: projetAlpes.id,
            treeCommonName: 'Pin sylvestre',
            quantity: 50,
            unitPrice: 8.9,
          },
          {
            treeId: acajou.id,
            projectId: projetAmazonie.id,
            treeCommonName: "Acajou d'Afrique",
            quantity: 20,
            unitPrice: 18,
          },
          {
            treeId: sequoia.id,
            projectId: projetAlpes.id,
            treeCommonName: 'Séquoia géant',
            quantity: 5,
            unitPrice: 25,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: user2.id,
      status: OrderStatus.canceled,
      amount: 45,
      items: {
        create: [
          {
            treeId: mangrove.id,
            projectId: projetMangrove.id,
            treeCommonName: 'Palétuvier rouge',
            quantity: 3,
            unitPrice: 15,
          },
        ],
      },
    },
  });

  console.log('📦 Commandes créées');
  console.log('\n✅ Seeding terminé avec succès !');
}

main()
  .catch((error) => {
    console.error('❌ Erreur lors du seeding :', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
