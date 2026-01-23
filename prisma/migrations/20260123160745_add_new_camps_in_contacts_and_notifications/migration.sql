/*
  Warnings:

  - Added the required column `unread` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Contact_email_idx";

-- DropIndex
DROP INDEX "Notifications_id_unread_idx";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "unread" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "contactId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Contact_email_createdAt_idx" ON "Contact"("email", "createdAt");

-- CreateIndex
CREATE INDEX "Notifications_id_unread_createdAt_idx" ON "Notifications"("id", "unread", "createdAt");
