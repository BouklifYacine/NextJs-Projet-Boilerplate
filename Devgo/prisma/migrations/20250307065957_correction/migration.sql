/*
  Warnings:

  - You are about to drop the `Favoris` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'utilisateur');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'pro');

-- CreateEnum
CREATE TYPE "PlanAbonnement" AS ENUM ('mois', 'année');

-- DropForeignKey
ALTER TABLE "Favoris" DROP CONSTRAINT "Favoris_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clientId" TEXT,
ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'free',
ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'utilisateur';

-- DropTable
DROP TABLE "Favoris";

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "periode" "PlanAbonnement" NOT NULL,
    "datedebut" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datefin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Abonnement_userId_key" ON "Abonnement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clientId_key" ON "User"("clientId");

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
