/*
  Warnings:

  - You are about to drop the `softSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "manage"."softSkills";

-- CreateTable
CREATE TABLE "manage"."SoftSkills" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{}',
    "description" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoftSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SoftSkills_name_createdAt_idx" ON "manage"."SoftSkills"("name", "createdAt");
