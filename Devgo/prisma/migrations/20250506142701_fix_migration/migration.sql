/*
  Warnings:

  - The values [annee] on the enum `PlanAbonnement` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanAbonnement_new" AS ENUM ('mois', 'année');
ALTER TABLE "Abonnement" ALTER COLUMN "periode" TYPE "PlanAbonnement_new" USING ("periode"::text::"PlanAbonnement_new");
ALTER TYPE "PlanAbonnement" RENAME TO "PlanAbonnement_old";
ALTER TYPE "PlanAbonnement_new" RENAME TO "PlanAbonnement";
DROP TYPE "PlanAbonnement_old";
COMMIT;
