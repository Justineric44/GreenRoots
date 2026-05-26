// Ce fichier prépare l’environnement global utilisé avant et après les tests automatisés.
// Il servira plus tard à :
// - réinitialiser la base de données de test ;
// - nettoyer les données entre les tests ;
// - fermer proprement Prisma après l’exécution.

// Prépare et nettoie l’environnement avant et après les tests automatisés.

import { PrismaClient } from '../prisma/generated/client';

export const prisma = new PrismaClient();

console.log('Test environment initialized');
