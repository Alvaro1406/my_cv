-- CreateTable
CREATE TABLE "manage"."WorkExperience" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" JSONB NOT NULL DEFAULT '{}',
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manage"."Projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" JSONB NOT NULL DEFAULT '{}',
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workExperienceId" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkExperience_id_name_createdAt_idx" ON "manage"."WorkExperience"("id", "name", "createdAt");

-- CreateIndex
CREATE INDEX "Projects_id_name_createdAt_idx" ON "manage"."Projects"("id", "name", "createdAt");

-- AddForeignKey
ALTER TABLE "manage"."Projects" ADD CONSTRAINT "Projects_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "manage"."WorkExperience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
