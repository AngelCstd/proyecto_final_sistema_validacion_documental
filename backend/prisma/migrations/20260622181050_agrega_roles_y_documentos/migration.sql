/*
  Warnings:

  - Added the required column `nombre` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RolesUser" AS ENUM ('ADMIN', 'CAPTURISTA');

-- CreateEnum
CREATE TYPE "StatusDocument" AS ENUM ('VIGENTE', 'REVOCADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "QrPosition" AS ENUM ('SUPERIOR_DERECHA', 'SUPERIOR_IZQUIERDA', 'INFERIOR_DERECHA', 'INFERIOR_IZQUIERDA', 'ULTIMA_PAGINA_INFERIOR_DERECHA');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "rol" "RolesUser" NOT NULL DEFAULT 'CAPTURISTA';

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "folio" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "areaEmisora" TEXT NOT NULL,
    "estado" "StatusDocument" NOT NULL DEFAULT 'VIGENTE',
    "qrPosicion" "QrPosition" NOT NULL,
    "originalPdfPath" TEXT NOT NULL,
    "qrPdfPath" TEXT NOT NULL,
    "qrImagePath" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_folio_key" ON "documents"("folio");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
