-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favoris" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "favoriId" INTEGER NOT NULL,

    CONSTRAINT "Favoris_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Favoris" ADD CONSTRAINT "Favoris_favoriId_fkey" FOREIGN KEY ("favoriId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
