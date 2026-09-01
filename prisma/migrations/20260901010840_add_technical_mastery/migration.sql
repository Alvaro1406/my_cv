/*
  Warnings:

  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "manage"."Skills";

-- CreateTable
CREATE TABLE "manage"."TechnicalMastery" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{}',
    "description" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechnicalMastery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TechnicalMastery_name_createdAt_idx" ON "manage"."TechnicalMastery"("name", "createdAt");
