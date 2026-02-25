/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "manage";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "security";

-- CreateEnum
CREATE TYPE "manage"."TypeSkills" AS ENUM ('FrontEnd', 'BackEnd', 'Design', 'Tools');

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_contactId_fkey";

-- DropForeignKey
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_userId_fkey";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Notifications";

-- DropTable
DROP TABLE "Skills";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserSession";

-- DropEnum
DROP TYPE "TypeSkills";

-- CreateTable
CREATE TABLE "security"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security"."UserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manage"."Skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "manage"."TypeSkills" NOT NULL,
    "description" JSONB NOT NULL DEFAULT '{}',
    "level" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manage"."Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT true,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manage"."Notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "security"."User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "security"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_token_key" ON "security"."UserSession"("token");

-- CreateIndex
CREATE INDEX "UserSession_userId_token_expiresAt_idx" ON "security"."UserSession"("userId", "token", "expiresAt");

-- CreateIndex
CREATE INDEX "Skills_name_type_idx" ON "manage"."Skills"("name", "type");

-- CreateIndex
CREATE INDEX "Contact_email_unread_archived_createdAt_idx" ON "manage"."Contact"("email", "unread", "archived", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_contactId_key" ON "manage"."Notifications"("contactId");

-- CreateIndex
CREATE INDEX "Notifications_unread_createdAt_idx" ON "manage"."Notifications"("unread", "createdAt");

-- AddForeignKey
ALTER TABLE "security"."UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "security"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manage"."Notifications" ADD CONSTRAINT "Notifications_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "manage"."Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
