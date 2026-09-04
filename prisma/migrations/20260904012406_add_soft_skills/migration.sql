-- CreateTable
CREATE TABLE "manage"."softSkills" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL DEFAULT '{}',
    "description" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "softSkills_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "softSkills_name_createdAt_idx" ON "manage"."softSkills"("name", "createdAt");
