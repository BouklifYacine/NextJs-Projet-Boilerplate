// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Fonction pour obtenir l'URL de la base de données selon l'environnement
const getDatabaseUrl = (): string => {
  // Utilise la DB de prod si NODE_ENV est "production" OU si on est dans un build optimisé
  const useProduction = process.env.NODE_ENV === "production" || process.env.NEXT_PHASE === "phase-production-build";
  
  if (useProduction) {
    return process.env.DATABASE_URL_PROD!;
  }
  
  return process.env.DATABASE_URL!;
};

// Définir la variable DATABASE_URL dynamiquement pour Prisma
const dbUrl = getDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

// évite de multiple instanciations en dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Log simplifié
console.log(`🔗 Base de données: ${dbUrl.includes('summer-king') ? 'DEV (summer-king)' : 'PROD (lingering-darkness)'}`);
