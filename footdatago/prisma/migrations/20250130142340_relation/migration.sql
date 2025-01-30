/*
  Warnings:

  - You are about to drop the column `content` on the `Favoris` table. All the data in the column will be lost.
  - You are about to drop the column `favoriId` on the `Favoris` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Favoris` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Favoris` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `joueurId` to the `Favoris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joueurNom` to the `Favoris` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Favoris` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favoris" DROP CONSTRAINT "Favoris_favoriId_fkey";

-- AlterTable
ALTER TABLE "Favoris" DROP COLUMN "content",
DROP COLUMN "favoriId",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "joueurId" INTEGER NOT NULL,
ADD COLUMN     "joueurNom" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "nom" TEXT;

-- AddForeignKey
ALTER TABLE "Favoris" ADD CONSTRAINT "Favoris_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
